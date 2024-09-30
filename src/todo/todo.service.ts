import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TodoService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('TodoDB');

  onModuleInit() {
    this.logger.log('Database Todo Connect');
  }

  async create(createTodoDto: CreateTodoDto) {
    return await this.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.todo.findMany();
  }

  async findOne(id: string) {
    const todo = await this.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo)
      throw new NotFoundException({
        message: `todo with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    this.findOne(id);

    return await this.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string) {
    this.findOne(id);

    return await this.todo.update({
      where: { id },
      data: {
        status: false,
      },
    });
  }
}
