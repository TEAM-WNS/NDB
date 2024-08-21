import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataService } from './data.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}
