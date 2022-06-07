import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './service/user.service'
import { User } from '@prisma/client'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  async getUsers(): Promise<User[]> {
    return this.userService.users({})
  }

  @Get("users/:id")
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id: Number(id) })
  }

  @Post("users")
  async createUser(@Body() userData: { email: string, name: string }): Promise<User> {
    return this.userService.createUser(userData)
  }

  @Put("users/:id")
  async putUser(@Param("id") id: string, @Body() userData: { email: string, name: string }): Promise<User> {
    return this.userService.updateUser({ 
      where: { id: Number(id) },
      data: userData
    })
  }

  @Delete("users/:id")
  async deleteUser(@Param("id") id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) })
  }
}
