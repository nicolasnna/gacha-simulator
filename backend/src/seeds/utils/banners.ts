import { BannerEnum } from '@common/enums'
import { Rates } from '@common/types'

type banner = {
  anime: string
  type: BannerEnum
  rates: Rates
  costSinglePull: number
  costMultiPull: number
}

export const bannerList: banner[] = [
  {
    anime: 'naruto',
    type: BannerEnum.Promotional,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30.0,
      c: 65.0
    },
    costSinglePull: 3,
    costMultiPull: 25
  }
]
