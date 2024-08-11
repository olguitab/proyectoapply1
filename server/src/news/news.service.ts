import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from './news.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

function EditarFecha(created_at){
  const [, horaConZ] = created_at.split('T');

  const hora = horaConZ.slice(0, 5);
  const fecha = new Date(created_at);
  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();

  // Determina si es AM o PM
  const esPM = horas >= 12;
  const horasAjustadas = horas % 12 || 12; // Convierte a formato de 12 horas, tratando las 0 horas como 12

  // Formatea minutos para asegurar dos dígitos
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  // Compone la nueva cadena de tiempo
  const tiempoFormateado = `${horas}:${minutosFormateados} ${esPM ? 'pm' : 'am'}`;

  return tiempoFormateado;
}
@Injectable()
export class NewsService {

  private readonly apiUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('Ejecutando tarea cron para actualizar noticias desde la API:', new Date());
    await this.cargarDatosDesdeAPI();
  }

  async cargarDatosDesdeAPI(): Promise<any> {
    try {
      const response = await axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
      const noticias = response.data.hits.map(hit => ({
        objectID: hit.objectID,
        autor: hit.author,
        titulo: hit.story_title,
        url: hit.story_url,
        comentario: hit.comment_text,
        _highlightResult: hit._highlightResult,
        _tags: hit._tags,
        children: hit.children,
        created_at: EditarFecha(hit.created_at),
        created_at_i: hit.created_at_i,
        parent_id: hit.parent_id,
        story_id: hit.story_id,
        updated_at: hit.updated_at
        // Asegúrate de mapear todos los campos necesarios aquí
      }));
  
      for (const noticia of noticias) {
        await this.newsModel.findOneAndUpdate({ objectID: noticia.objectID }, noticia, { upsert: true, new: true });
      }
  
      console.log('Datos cargados exitosamente desde la API.');
      return noticias;
    } catch (error) {
      console.error('Error al cargar datos desde la API:', error);
      throw new Error('Error al cargar datos desde la API');
    }
  }
  async findByObjectID(objectID: string): Promise<News> {
    const news = await this.newsModel.findOne({ objectID }).exec();
    if (!news) {
      throw new NotFoundException(`News with objectID "${objectID}" not found.`);
    }
    return news;
  }

  async obtenerDatos(): Promise<any> {
    console.log("Accediendo a la base de datos para obtener datos...");
    try {
      const response = await axios.get(`${this.apiUrl}/endpoint-especifico`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error('Error al obtener datos de la API');
    }
  }
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

  async create(createNoticiaDto: any): Promise<News> {
    const createdNoticia = new this.newsModel(createNoticiaDto);
    return createdNoticia.save();
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