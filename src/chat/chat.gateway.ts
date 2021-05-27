
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
import { Server,Socket } from 'socket.io';
import { CreateNewDto } from 'src/news/dto/create-new.dto';
import { NewsService } from 'src/news/news.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(

    private readonly userService: UsersService,
    private readonly newService : NewsService
   
  ) { }
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');


  @SubscribeMessage('events')
  findAll(client:Socket, text: string) {
    console.log(text,client.id)
  }

  @SubscribeMessage('chat:add')
  async addChat( @ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      client.join(data.nameRoom)
      console.log(client.id)
     console.log( client.adapter.rooms[data.nameRoom])
      
    } catch (error) {
      
    }
   
  }

  @SubscribeMessage('new:add')
  async addNews( @ConnectedSocket() client: Socket, @MessageBody() data: CreateNewDto) {
    try {
      
    } catch (error) {
      
    }
   
  }



  @SubscribeMessage('chats')
  async getChat( @ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      return "Привет"
      
    } catch (error) {
      
    }
   
  }

  @SubscribeMessage('message:add')
  async allChat( @ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      client.emit('chats',data)
      
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
    console.log(`Client connected: ${client.handshake.query.userId}`)
    const user = await this.userService.find(client.handshake.query.userId)
    console.log(user)

  }
}