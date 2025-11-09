import GachaBanners from '@/components/Gacha/GachaBanners'
import GachaContainer from '@/components/Gacha/GachaContainer'
import { IconGachaMachine } from '@/components/Icons/IconGachaMachine'
import { IconPromotionalGem } from '@/components/Icons/IconPromotionalGem'
import { IconStandardGem } from '@/components/Icons/IconStandardGem'
import type { RarityType } from '@/interfaces/rarity.interface'
import { useBanners } from '@/services/hooks/useBanners'
import useUserCredits from '@/services/hooks/useUserCredits'
import { Card, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface RarityCard {
  rare: RarityType
  prob: number
}

const rarityCards: RarityCard[] = [
  { rare: 'ssr', prob: 0.5 },
  { rare: 'sr', prob: 3 },
  { rare: 'r', prob: 12 },
  { rare: 'c', prob: 84.5 }
]

function GachaView() {
  const { credits } = useUserCredits()
  const { banners, getBanners } = useBanners()
  const [bannerNro, setBannerNro] = useState<number>(0)

  useEffect(() => {
    getBanners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container centerContent py={2} spaceY={2}>
      <HStack
        mb={4}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <IconGachaMachine />
        <Heading
          size={'4xl'}
          color="text"
          textTransform="uppercase"
          textAlign="center"
        >
          Simulador de Gacha
        </Heading>
      </HStack>

      <GachaBanners
        banners={banners}
        bannerSelected={bannerNro}
        setBannerSelected={setBannerNro}
      />

      <HStack flexDir="row" color="text">
        <IconStandardGem />
        <Text>Standard: {credits.standard}</Text>

        <IconPromotionalGem />
        <Text>Promotional: {credits.promotional}</Text>
      </HStack>

      <GachaContainer bannerSelected={banners[bannerNro]} />

      <HStack
        as="section"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {rarityCards.map((rarityCard) => (
          <Card.Root
            width={150}
            alignItems="center"
            bg={rarityCard.rare}
            border={0}
            key={rarityCard.rare}
          >
            <Card.Header fontSize={'xl'} fontWeight="bold">
              {rarityCard.rare}
            </Card.Header>
            <Card.Body textAlign="center" fontSize={'sm'} pt={2}>
              <p>Probabilidad: {rarityCard.prob}%</p>
            </Card.Body>
          </Card.Root>
        ))}
      </HStack>
    </Container>
  )
}

export default GachaView
