import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), RedisModule],
  exports: [BoardsService],
  providers: [BoardsService, BoardRepository],
  controllers: [BoardsController],
})
export class BoardsModule {}
