import GachaContainer from '@/components/Gacha/GachaContainer'
import type { RarityType } from '@/interfaces/rarity.interface'
import { Card, Container, Heading, HStack, Text } from '@chakra-ui/react'

interface rarityCard {
  rarity: RarityType
  probability: number
}

const rarityCards: rarityCard[] = [
  {
    rarity: 'ssr',
    probability: 3
  },
  {
    rarity: 'sr',
    probability: 12
  },
  {
    rarity: 'r',
    probability: 25
  },
  {
    rarity: 'c',
    probability: 60
  }
]

function GachaView() {
  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap="wrap">
        <img
          src="https://emojicdn.elk.sh/🎰?style=facebook"
          width={40}
          alt="Máquina gatcha"
        />
        <Heading size={'4xl'} color="text">
          Simulador de Gacha
        </Heading>
      </HStack>

      <HStack flexDir="row" color="text">
        <img
          src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
          width={25}
          alt="Diamante"
        />
        <Text>Monedas: 9000</Text>
      </HStack>

      <GachaContainer />

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
            bg={rarityCard.rarity}
            border={0}
            key={rarityCard.rarity}
          >
            <Card.Header fontSize={'xl'} fontWeight="bold">
              {rarityCard.rarity}
            </Card.Header>
            <Card.Body textAlign="center" fontSize={'sm'} pt={2}>
              <p>Probabilidad de obtención: {rarityCard.probability}%</p>
            </Card.Body>
          </Card.Root>
        ))}
      </HStack>
    </Container>
  )
}

export default GachaView
