import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsService } from './news/news.service';
import { NewsModule } from './news/news.module';

@Module({
  imports: [NewsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {} 
