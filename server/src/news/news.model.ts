import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

class HighlightResultAuthor {
  @Prop()
  matchLevel: string;

  @Prop([String])
  matchedWords: string[];

  @Prop()
  value: string;
}

class HighlightResultCommentText {
  @Prop()
  fullyHighlighted: boolean;

  @Prop()
  matchLevel: string;

  @Prop([String])
  matchedWords: string[];

  @Prop()
  value: string;
}

class HighlightResultStoryTitle {
  @Prop()
  matchLevel: string;

  @Prop([String])
  matchedWords: string[];

  @Prop()
  value: string;
}

class HighlightResultStoryUrl {
  @Prop()
  matchLevel: string;

  @Prop([String])
  matchedWords: string[];

  @Prop()
  value: string;
}

class HighlightResult {
  @Prop({ type: HighlightResultAuthor })
  author: HighlightResultAuthor;

  @Prop({ type: HighlightResultCommentText })
  comment_text: HighlightResultCommentText;

  @Prop({ type: HighlightResultStoryTitle })
  story_title: HighlightResultStoryTitle;

  @Prop({ type: HighlightResultStoryUrl })
  story_url: HighlightResultStoryUrl;
}

@Schema()
export class News extends Document {

  @Prop({ type: HighlightResult })
  _highlightResult: HighlightResult;

  @Prop({ required: true, unique: true })
  objectID: string;

  @Prop([String])
  _tags: string[];

  @Prop()
  author: string;

  @Prop({ type: [Number] })
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