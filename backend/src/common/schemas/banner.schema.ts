import { BannerEnum } from '@common/enums'
import { Rates } from '@common/types'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type BannerDocument = HydratedDocument<Banner>

@Schema({
  timestamps: true
})
export class Banner {
  @Prop({ required: true, type: [String] })
  anime: string[]

  @Prop({ required: true, enum: BannerEnum })
  type: BannerEnum

  @Prop({ required: true, type: Object })
  rates: Rates

  @Prop({ default: 3, type: Number })
  costSinglePull: number

  @Prop({ default: 25, type: Number })
  costMultiPull: number

  @Prop({ type: String })
  imgUrl: string
}

export const BannerSchema = SchemaFactory.createForClass(Banner)
