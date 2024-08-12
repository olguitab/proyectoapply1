import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './news.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({ 
    imports: [MongooseModule.forFeature([{name: News.name, schema:NewsSchema},],),ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService] 
})
export class NewsModule {}