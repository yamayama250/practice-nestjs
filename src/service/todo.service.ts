import { Injectable } from "@nestjs/common"
import { PrismaService } from '../prisma.service'
import { ToDo, Prisma } from "@prisma/client"

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) {}

  async todo(userWhereUniqueInput: Prisma.ToDoWhereUniqueInput): Promise<ToDo | null> {
    return this.prisma.toDo.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToDoWhereUniqueInput;
    where?: Prisma.ToDoWhereUniqueInput;
    orderBy?: Prisma.ToDoOrderByWithRelationInput;
  }): Promise<ToDo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.toDo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createTodo(data: Prisma.ToDoCreateInput): Promise<ToDo> {
    return this.prisma.toDo.create({
      data,
    })
  }

  async updateTodo(params: {
    where: Prisma.ToDoWhereUniqueInput;
    data: Prisma.ToDoUpdateInput;
  }): Promise<ToDo> {
    const { where, data } = params;
    return this.prisma.toDo.update({
      data,
      where,
    })
  }

  async deleteTodo(where: Prisma.ToDoWhereUniqueInput): Promise<ToDo> {
    return this.prisma.toDo.delete({
      where,
    })
  }
}