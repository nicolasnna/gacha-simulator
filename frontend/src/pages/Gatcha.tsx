import type { Rarity } from '@/interfaces/rarity.interface'
import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'

interface rarityCard {
  rarity: Rarity
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

function Gatcha() {
  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap='wrap'>
        <img src='https://emojicdn.elk.sh/🎰?style=facebook' width={40} alt='Máquina gatcha'/>
        <Heading size={'4xl'} color="text">
          Simulador de Gacha
        </Heading>
      </HStack>

      <Box color="text">
        <Stack flexDir="row">
          <img src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google" width={25} alt='Diamante' />
          <Text>Monedas: 9000</Text>
        </Stack>
      </Box>

      <Card.Root
        width="18rem"
        alignItems="center"
        bg="bg-secondary.400"
        borderRadius={15}
        border="none"
      >
        <Card.Header alignSelf="end">
          <img src="https://emojicdn.elk.sh/%E2%84%B9?style=google" width={25} alt='Información' />
        </Card.Header>
        <Card.Body>
          <img src="https://emojicdn.elk.sh/%F0%9F%8E%81?style=google" width={120} alt='Caja gatcha'/>
        </Card.Body>
        <Card.Footer spaceX={4}>
          <Button bg="primary" fontSize="xl" p={5} borderRadius={10}>
            Tirar 1
          </Button>
          <Button bg="primary" fontSize="xl" p={5} borderRadius={10}>
            Tirar 10
          </Button>
        </Card.Footer>
      </Card.Root>

      <HStack as="section" flexWrap='wrap' alignItems='center' justifyContent='center'>
        {rarityCards.map((rarityCard) => (
          <Card.Root
            width={150}
            alignItems="center"
            bg={rarityCard.rarity}
            border={0}
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

export default Gatcha
