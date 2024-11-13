import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSEED() {
    console.log('Estamos llamando al executeSEED');
    return this.seedService.executeSEED();
  }

}
