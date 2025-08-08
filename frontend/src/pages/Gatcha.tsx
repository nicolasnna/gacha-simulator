import { Box, Button, Card, Container, Heading, Stack } from '@chakra-ui/react'

interface rarityCard {
  rarity: 'ssr' | 'sr' | 'r' | 'c'
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
      <Box mt={10}>
        <Heading size={'4xl'} color="text">
          Simulador de Gacha
        </Heading>
      </Box>

      <Box color="text">
        <Stack flexDir="row">
          <img src="https://emojicdn.elk.sh/%F0%9F%92%8E" width={25} />
          <p>Monedas: 9000</p>
        </Stack>
      </Box>

      <Card.Root width="18rem" alignItems="center" bg="bg-secondary" border={0}>
        <Card.Header alignSelf="end">
          <img src="https://emojicdn.elk.sh/%E2%84%B9" width={25} />
        </Card.Header>
        <Card.Body>
          <img src="https://emojicdn.elk.sh/%F0%9F%8E%81" width={120} />
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

      <Stack flexDir="row">
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
      </Stack>
    </Container>
  )
}

export default Gatcha
