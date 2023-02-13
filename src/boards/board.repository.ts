import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description, password, writer } = createBoardDto;

    const board = this.create({
      title,
      description,
      password,
      status: BoardStatus.PUBLIC,
      createAt: String(new Date()),
      writer,
    });

    await this.save(board);
    return board;
  }
}
