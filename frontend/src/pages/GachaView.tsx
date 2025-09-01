import GachaContainer from '@/components/Gacha/GachaContainer'
import type { RarityType } from '@/interfaces/rarity.interface'
import useUserCredits from '@/services/hooks/useUserCredits'
import { Card, Container, Heading, HStack, Text } from '@chakra-ui/react'

interface rarityCard {
  rare: RarityType
  prob: number
}

const rarityCards: rarityCard[] = [
  { rare: 'ssr', prob: 0.5 },
  { rare: 'sr', prob: 3 },
  { rare: 'r', prob: 12 },
  { rare: 'c', prob: 84.5 }
]

function GachaView() {
  const { credits } = useUserCredits()

  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap="wrap">
        <img
          src="https://emojicdn.elk.sh/🎰?style=facebook"
          width={40}
          alt="Máquina gatcha"
        />
        <Heading size={'4xl'} color="text" textTransform="uppercase">
          Simulador de Gacha
        </Heading>
      </HStack>

      <HStack flexDir="row" color="text">
        <img
          src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
          width={25}
          alt="Diamante"
        />
        <Text>Monedas: {credits}</Text>
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
