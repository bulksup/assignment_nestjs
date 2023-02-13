import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@svtslv/nestjs-ioredis';

import { RedisService } from './redis.service';

@Module({
  imports: [
    NestRedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
