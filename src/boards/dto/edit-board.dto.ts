import { IsNotEmpty } from 'class-validator';

export class EditBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  writer: string;
}
