import { BannerEnum } from '@common/enums'
import { Banner } from '@common/schemas/banner.schema'

export const bannerList: Banner[] = [
  {
    anime: ['naruto'],
    type: BannerEnum.Promotional,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30,
      c: 65
    },
    costSinglePull: 3,
    costMultiPull: 25,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-naruto.webp'
  },
  {
    anime: ['black clover'],
    type: BannerEnum.Promotional,
    rates: {
      ssr: 1.5,
      sr: 5.5,
      r: 30,
      c: 63
    },
    costSinglePull: 5,
    costMultiPull: 45,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-black-clover.webp'
  },
  {
    anime: ['jujutsu kaisen'],
    type: BannerEnum.Promotional,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30,
      c: 65
    },
    costSinglePull: 3,
    costMultiPull: 25,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-jjk.webp'
  },
  {
    anime: ['sousou no frieren'],
    type: BannerEnum.Promotional,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30,
      c: 65
    },
    costSinglePull: 4,
    costMultiPull: 36,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-sousou-no-frieren.webp'
  },
  {
    anime: ['hajime no ippo'],
    type: BannerEnum.Promotional,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30,
      c: 65
    },
    costSinglePull: 4,
    costMultiPull: 36,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-hajime-no-ippo.webp'
  },
  {
    anime: ['naruto', 'hajime no ippo', 'jujutsu kaisen', 'black clover'],
    type: BannerEnum.Standard,
    rates: {
      ssr: 0.5,
      sr: 4.5,
      r: 30,
      c: 65
    },
    costSinglePull: 10,
    costMultiPull: 90,
    imgUrl:
      'https://raw.githubusercontent.com/nicolasnna/gacha-simulator/7c669775b65cd79515179ac3824c368e9bd46889/images/banner-standard.webp'
  }
]
