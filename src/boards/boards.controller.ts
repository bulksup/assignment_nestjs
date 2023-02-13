import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board, Likes } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //모든 게시물 가져오기
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  //게시물 생성하기
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  //게시물 id를 통해 게시물 가져오기
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //게시물 삭제하기
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  //게시물 공개여부 변경하기
  @Patch('/status/:id/')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    console.log('boards.controller.ts: updateBoardStatus: id: ', id);
    return this.boardsService.updateBoardStatus(id, status);
  }

  // 게시물 수정하기
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  editBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() editBoardDto: EditBoardDto,
  ): Promise<Board> {
    return this.boardsService.editBoard(id, editBoardDto);
  }

  // 좋아요 누르기
  @Patch('/likes/:id')
  updateLikes(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.boardsService.updateLikes(id);
  }

  // 게시물 id로 좋아요 구하기
  @Get('/likes/:id')
  getLikesById(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.boardsService.getLikesById(id);
  }
}
