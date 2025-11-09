import type { Banner } from '@/interfaces/banner.interface'
import { generateRandomKey } from '@/utils/random-string'
import { Carousel, Center, IconButton, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface GachaBannersProps {
  banners: Banner[]
}

export default function GachaBanners({ banners }: Readonly<GachaBannersProps>) {
  const [page, setPage] = useState(0)

  return (
    <Carousel.Root
      slideCount={banners.length}
      page={page}
      onPageChange={(e) => setPage(e.page)}
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

        <Carousel.Indicators />

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
