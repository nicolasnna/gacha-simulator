import CardCharacter from '@/components/Card/CardCharacter'
import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { getAllCharacters } from '@/services/redux/characters'
import { Container, Heading, HStack } from '@chakra-ui/react'
import { useEffect } from 'react'

function Characters() {
  const characters = useAppSelector((s) => s.characters.data)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllCharacters({ page: 1, limit: 20 }))
  }, [dispatch])

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
        {characters.map((chara) => (
          <CardCharacter key={chara.id} data={chara} />
        ))}
      </HStack>
    </Container>
  )
}

export default Characters
