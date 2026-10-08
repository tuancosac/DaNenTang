import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TestDb {
  @Prop()
  message: string;
}

export const TestDbSchema = SchemaFactory.createForClass(TestDb);