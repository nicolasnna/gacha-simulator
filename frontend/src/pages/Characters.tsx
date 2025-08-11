import CardCharacter from '@/components/card-character'
import { characterListFake } from '@/utils/data-fake'
import { Container, Heading, HStack } from '@chakra-ui/react'

function Characters() {
  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack my={2}>
        <Heading size="4xl" color="text">
          Personajes
        </Heading>
      </HStack>

      <HStack
        flexWrap="wrap"
        gap={5}
        alignItems="center"
        justifyContent="center"
      >
        {characterListFake.map((chara) => (
          <CardCharacter key={chara.id} data={chara} />
        ))}
      </HStack>
    </Container>
  )
}

export default Characters
