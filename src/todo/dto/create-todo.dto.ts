import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
