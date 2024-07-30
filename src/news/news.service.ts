import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from './news.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  findAll() {
    return this.newsModel.find().exec();
  }

  async findOne(id: string) {
    const news = this.newsModel.findOne({_id: id}).exec();
    if (!news) {
        throw new NotFoundException(`La noticia #${id} no fue encontrada`);
    }
    return news;
  }

  create(createNewsDto: any) {
    const news = new this.newsModel(createNewsDto);
    return news.save()
  }

  async update(id: string, updateNewsDto: any) {
    const existingNews = await this.newsModel
    .findOneAndUpdate({_id: id}, {$set:updateNewsDto }, {new: true})
    .exec();

    if (!existingNews) {
      throw new NotFoundException(`No fue encontrada la noticia #${id} para actualizarla`);
    }
    return existingNews;
  }

  async remove(id: string) {
    const existingNews = await this.newsModel
    .findOneAndDelete({_id: id})
    .exec();
    if (!existingNews) {
        throw new NotFoundException(`No fue encontrada la noticia #${id} para eliminarla`);
      }
      return existingNews;
  }
}