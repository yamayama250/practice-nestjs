import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ToDoService } from './service/todo.service'
import { ToDo } from '@prisma/client'

@Controller("api/v1")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: ToDoService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("todos")
  async getUsers(): Promise<ToDo[]> {
    return this.userService.todos({})
  }

  @Get("todos/:id")
  async getUser(@Param('id') id: string): Promise<ToDo> {
    return this.userService.todo({ id: Number(id) })
  }

  @Post("todos")
  async createUser(@Body() todoData: { title: string, body: string }): Promise<ToDo> {
    return this.userService.createTodo(todoData)
  }

  @Put("todos/:id")
  async putUser(@Param("id") id: string, @Body() todoData: { title: string, body: string }): Promise<ToDo> {
    return this.userService.updateTodo({ 
      where: { id: Number(id) },
      data: todoData
    })
  }

  @Delete("todos/:id")
  async deleteUser(@Param("id") id: string): Promise<ToDo> {
    return this.userService.deleteTodo({ id: Number(id) })
  }
}
