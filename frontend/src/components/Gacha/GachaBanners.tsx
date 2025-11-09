import type { Banner } from '@/interfaces/banner.interface'
import { generateRandomKey } from '@/utils/random-string'
import {
  Carousel,
  CarouselIndicator,
  CarouselIndicatorGroup,
  Center,
  IconButton,
  Image,
  type CarouselPageChangeDetails
} from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface GachaBannersProps {
  banners: Banner[]
  bannerSelected: number
  setBannerSelected: React.Dispatch<React.SetStateAction<number>>
}

export default function GachaBanners({
  banners,
  bannerSelected,
  setBannerSelected
}: Readonly<GachaBannersProps>) {
  const handleBannerChange = (e: CarouselPageChangeDetails) => {
    setBannerSelected(e.page)
  }

  return (
    <Carousel.Root
      slideCount={banners.length}
      page={bannerSelected}
      onPageChange={handleBannerChange}
      maxW="xl"
    >
      <Carousel.ItemGroup>
        {banners.map((banner, index) => (
          <Carousel.Item key={generateRandomKey()} index={index}>
            <Center>
              <Image
                fit="cover"
                src={banner.imgUrl}
                alt={`Banner img ${index}`}
                h="300px"
                rounded="lg"
              />
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <CarouselIndicatorGroup>
          {banners.map((banner, index) => (
            <CarouselIndicator
              key={generateRandomKey()}
              index={index}
              unstyled
              _current={{
                outline: '2px solid currentColor',
                outlineOffset: '2px'
              }}
              cursor={'pointer'}
            >
              <Image
                fit="cover"
                src={banner.imgUrl}
                alt={`Banner img ${index}`}
                h="30px"
              />
            </CarouselIndicator>
          ))}
        </CarouselIndicatorGroup>

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
        {/* <Carousel.ProgressText /> */}
      </Carousel.Control>
    </Carousel.Root>
  )
}
