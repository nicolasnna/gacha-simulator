import CardCharacter from '@/components/Card/CardCharacter'
import useCharactersObtained from '@/services/hooks/useCharactersObtained'
import { Container, Heading, HStack } from '@chakra-ui/react'
import { useEffect } from 'react'

function Characters() {
  const { chars, getCharactersObtained } = useCharactersObtained()

  useEffect(() => {
    if (chars.length === 0) getCharactersObtained()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars])

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
        {chars.map((chara) => (
          <CardCharacter key={chara.characterId} data={chara} />
        ))}
      </HStack>
    </Container>
  )
}

export default Characters
