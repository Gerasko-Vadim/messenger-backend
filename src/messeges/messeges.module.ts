import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessegesService } from './messeges.service';
import { Messeges, MessegesSchema } from './schema/messeges.schema';

@Module({
    providers:[MessegesService],
    exports:[MessegesService],
    imports: [MongooseModule.forFeature([{ name: Messeges.name , schema: MessegesSchema}])]

})
export class MessegesModule {}
