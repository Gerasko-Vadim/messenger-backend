
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { ChatGroupService } from 'src/chat-group/chat-group.service';
import { IChatGroup } from 'src/chat-group/interface/chat-group.interface';
import { MessegesService } from 'src/messeges/messeges.service';
import { SendMessageDto } from 'src/messeges/dto/sendMesseg.dto';
import { CreateNewDto } from 'src/news/dto/create-new.dto';
import { NewsService } from 'src/news/news.service';
import { UsersService } from 'src/users/users.service';
import { IDeleteChat } from './iterface/delete-chat.interface';
import { CreateMessageDto } from 'src/messeges/dto/create-messeges.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(

    private readonly userService: UsersService,
    private readonly newService: NewsService,
    private readonly chatGroupService: ChatGroupService,
    private readonly messegeService: MessegesService

  ) { }
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');


  @SubscribeMessage('events')
  findAll(client: Socket, text: string) {
    console.log(text, client.id)
  }

  @SubscribeMessage('chat:add')
  async addChat(@ConnectedSocket() client: Socket, @MessageBody() data: CreateMessageDto) {
    try {
      console.log(data)
       await this.messegeService.create(data)
     

      return await this.messegeService.getAllChatsById(client.handshake.query.id)

    } catch (error) {

    }

  }

  @SubscribeMessage('DIALOGS:JOIN')
  async chatJoin(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    try {
      client.join(id);
      const messages = await this.messegeService.getAllMessagesRooms(id)
      this.server.to(id).emit('MESSAGES:DIALOGS',messages)
      return messages;



    } catch (error) {

    }

  }

  @SubscribeMessage('getAllChats')
  async getAllChats(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      const user = await this.userService.find(client.handshake.query.id)
      if (user.role === "student") {
        return await this.messegeService.getAllChatsByGroup(user.group)
      }
      else {
        return await this.messegeService.getAllChatsById(client.handshake.query.id)
      }

    } catch (error) {

    }

  }

  @SubscribeMessage('chat:delete')
  async deleteChat(@ConnectedSocket() client: Socket, @MessageBody() data: IDeleteChat) {
    try {
      await this.chatGroupService.deleteChat(data);
      return await this.chatGroupService.findByCreatedId(client.handshake.query.id)

    } catch (error) {

    }

  }

  @SubscribeMessage('new:add')
  async addNews(@ConnectedSocket() client: Socket, @MessageBody() data: CreateNewDto) {
    try {

    } catch (error) {

    }

  }



  @SubscribeMessage('chats')
  async getChat(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      return "????????????"

    } catch (error) {

    }

  }

  @SubscribeMessage('message:add')
  async allChat(@ConnectedSocket() client: Socket, @MessageBody() data: SendMessageDto) {
    try {
      console.log(data)
      await this.messegeService.sendMessage(data)
      console.log("await")
      
      const messages = await this.messegeService.getAllMessagesRooms(data.roomId)
      this.server.to(data.roomId).emit('NEW:MESSAGES',messages)
      return messages

    } catch (error) {

    }

  }
  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.handshake.query.id}`)
    const user = await this.userService.find(client.handshake.query.id)
    console.log(user)

  }
}