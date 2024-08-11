import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAllAndSave(): Promise<any[]> {
    // Obtiene y guarda las noticias de la API de Algolia
    const noticias = await this.newsService.cargarDatosDesdeAPI();
    // Retorna las noticias guardadas
    return noticias;
  }

  @Get(':objectID')
  async findOne(@Param('objectID') objectID: string) {
    return this.newsService.findByObjectID(objectID);
  }



  @Post()
  create(@Body() body) {
    return this.newsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.newsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}

