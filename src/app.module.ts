import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './registration/students/students.controller';
import { StudentsModule } from './registration/students/students.module';
import { StudentsService } from './registration/students/students.service';
import { TeachersController } from './registration/teachers/teachers.controller';
import { TeachersModule } from './registration/teachers/teachers.module';



@Module({
  imports: [
  StudentsModule,
  TeachersModule,
  MongooseModule.forRoot('mongodb+srv://vadim:qpVab8j4HxZtbvYN@cluster0.fzdop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {useNewUrlParser: true})
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
