import CardCharacter from '@/components/Card/CardCharacter'
import CardCharacterRemaining from '@/components/Card/CardCharacterRemaining'
import type { Character } from '@/interfaces/character.interface'
import useCharactersObtained from '@/services/hooks/useCharactersObtained'
import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { getAllCharacters } from '@/services/redux/characters'
import {
  Button,
  Container,
  Heading,
  HStack,
  Tabs,
  Text
} from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'

function Characters() {
  const { chars, getCharactersObtained } = useCharactersObtained()
  const { data, itemsInfo } = useAppSelector((s) => s.characters)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chars.length === 0) {
      getCharactersObtained()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars])

  const charsRemaining: Character[] = useMemo(() => {
    const charIdObtained = chars.map((char) => char.characterId)
    const remaining = data.filter(
      (charAll) => !charIdObtained.includes(charAll.id)
    )
    return remaining
  }, [data, chars])

  const loadMoreCharacters = () =>
    dispatch(
      getAllCharacters({ page: itemsInfo.page + 1, limit: itemsInfo.limit })
    )

  return (
    <Container centerContent py={2} spaceY={10}>
      <HStack my={2}>
        <img
          src="https://emojicdn.elk.sh/🃏?style=facebook"
          width={40}
          alt="card"
        />
        <Heading size="4xl" color="text" textTransform="uppercase">
          Personajes
        </Heading>
      </HStack>

      <Tabs.Root
        defaultValue="charObtained"
        variant="plain"
        lazyMount
        fitted
        w="100%"
        size="md"
      >
        <Tabs.List mx={10} boxSizing="content-box" w="100%">
          <Tabs.Trigger value="charObtained" color="text" fontSize="large">
            Obtenidos
          </Tabs.Trigger>
          <Tabs.Trigger value="charRemained" color="text" fontSize="large">
            Faltantes
          </Tabs.Trigger>
          <Tabs.Indicator rounded="md" bg="bg-secondary" />
        </Tabs.List>
        <Tabs.Content value="charObtained" spaceY={2}>
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
        </Tabs.Content>
        <Tabs.Content value="charRemained" spaceY={2}>
          <HStack
            flexWrap="wrap"
            gap={5}
            alignItems="center"
            justifyContent="center"
          >
            {charsRemaining.map((chara) => (
              <CardCharacterRemaining key={chara.id} data={chara} />
            ))}
          </HStack>
          <HStack justifyContent="end">
            <Text color="white" fontSize="large">
              Personajes revisados{' '}
              {itemsInfo.lastItemNumber < itemsInfo.totalItems
                ? itemsInfo.lastItemNumber
                : itemsInfo.totalItems}{' '}
              de {itemsInfo.totalItems}
            </Text>
            <Button
              bg="primary"
              onClick={loadMoreCharacters}
              disabled={
                itemsInfo.lastItemNumber >= itemsInfo.totalItems &&
                itemsInfo.lastItemNumber !== 0
              }
            >
              Comprobar más
            </Button>
          </HStack>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}

export default Characters
