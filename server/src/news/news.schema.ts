// noticias/noticia.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewsDocument = News & Document;

class HighlightResult {
  @Prop({ type: { matchLevel: String, matchedWords: [String], value: String } })
  author: Record<string, any>;

  @Prop({ type: { fullyHighlighted: Boolean, matchLevel: String, matchedWords: [String], value: String } })
  comment_text: Record<string, any>;

  @Prop({ type: { matchLevel: String, matchedWords: [String], value: String } })
  story_title: Record<string, any>;

  @Prop({ type: { matchLevel: String, matchedWords: [String], value: String } })
  story_url: Record<string, any>;
}

@Schema()
export class News {

  @Prop({ type: HighlightResult })
  _highlightResult: HighlightResult;

  @Prop([String])
  _tags: string[];

  @Prop({ required: true, unique: true })
  objectID: string;
  
  @Prop()
  author: string;

  @Prop([Number])
  children: number[];

  @Prop()
  comment_text: string;

  @Prop()
  created_at: string;

  @Prop()
  created_at_i: number;

  @Prop()
  parent_id: number;

  @Prop()
  story_id: number;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;

  @Prop()
  updated_at: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);