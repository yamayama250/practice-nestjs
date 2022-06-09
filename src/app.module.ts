import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prisma.service"
import { ToDoService } from "./service/todo.service"

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ToDoService, PrismaService],
})
export class AppModule {}
