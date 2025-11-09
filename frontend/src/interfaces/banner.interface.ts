export type BannerType = 'standard' | 'promotional'

export interface Banner {
  _id: string
  type: BannerType
  rates: Record<string, number>
  costSinglePull: number
  costMultiPull: number
  imgUrl: string
}
