import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board, Likes } from './board.entity';
import { EditBoardDto } from './dto/edit-board.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
    private readonly redis: RedisService,
  ) {}

  //전체 게시물 가져오기
  async getAllBoards(): Promise<Board[]> {
    const board = await this.boardsRepository.find();
    return board;
  }

  // 게시물 생성하기
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  // 게시물 id로 찾기
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOneBy({
      id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
    return found;
  }

  // 게시물 삭제하기
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
  }

  // 게시물 공개여부 변경하기
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    console.log('board is : ', board);

    board.status = status;
    await this.boardsRepository.save(board);

    return board;
  }

  // 게시물 수정하기
  async editBoard(id: number, editBoardDto: EditBoardDto): Promise<Board> {
    const board = await this.getBoardById(id);
    console.log('board is : ', board);

    const { title, description, password, writer } = editBoardDto;

    board.title = title;
    board.description = description;
    board.createAt = String(new Date());
    board.password = password;
    board.writer = writer;

    await this.boardsRepository.save(board);

    return board;
  }

  // 게시물 좋아요 누르기
  async updateLikes(id: number): Promise<number> {
    const likes = (await this.redis.get(`board:${id}:likes`)) + 1;
    await this.redis.set(`board:${id}:likes`, likes);

    const board = await this.getBoardById(id);
    board.likes = likes;
    await this.boardsRepository.save(board);

    return likes;
  }

  // 게시물 id로 좋아요 가져오기
  async getLikesById(id: number): Promise<number> {
    const likes = await this.redis.get(`board:${id}:likes`);
    const result = likes ? likes : 0;

    const board = await this.getBoardById(id);
    board.likes = result;
    await this.boardsRepository.save(board);

    return result;
  }
}
