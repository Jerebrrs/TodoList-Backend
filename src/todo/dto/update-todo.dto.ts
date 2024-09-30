import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsUUID } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsUUID()
  id: string;
}
