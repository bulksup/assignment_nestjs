import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, data: number, expire?: number) {
    return expire
      ? await this.redis.set(key, data, 'EX', expire)
      : await this.redis.set(key, data);
  }

  async get(key: string) {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    return await this.redis.del(key);
  }
}
