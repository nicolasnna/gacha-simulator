import CardCharacter from '@/components/Card/CardCharacter'
import CardCharacterRemaining from '@/components/Card/CardCharacterRemaining'
import FieldSelect from '@/components/Form/FieldSelect'
import { useBanners } from '@/services/hooks/useBanners'
import useCharactersObtained from '@/services/hooks/useCharactersObtained'
import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { getCharacterRemaining } from '@/services/redux/characters'
import {
  Box,
  Container,
  createListCollection,
  Heading,
  HStack,
  Tabs
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function Characters() {
  const { chars, setAnime } = useCharactersObtained()
  const { dataRemaining } = useAppSelector((s) => s.characters)
  const { banners, getBanners } = useBanners()
  const dispatch = useAppDispatch()
  const { control, watch } = useForm({
    defaultValues: { anime: 'naruto' }
  })
  const anime = watch('anime')

  useEffect(() => {
    if (!anime) return

    const fetchData = async () => {
      await getBanners() // Espera que carguen los banners primero
      setAnime(anime)
      dispatch(getCharacterRemaining({ anime }))
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anime])

  const animeList = banners.map((banner) => banner.anime).flat()
  const uniqueAnime = [...new Set(animeList)]

  const animeCollection = createListCollection({
    items: uniqueAnime.map((anime) => ({
      label: anime,
      value: anime
    }))
  })

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

      <Box w={600}>
        <FieldSelect
          control={control}
          values={animeCollection}
          name="anime"
          placeholder="Anime a filtrar"
        />
      </Box>

      <Tabs.Root
        defaultValue="charObtained"
        variant="plain"
        lazyMount
        fitted
        w="100%"
        size="md"
      >
        <Tabs.List mx={10} boxSizing="content-box">
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
            {dataRemaining.map((chara) => (
              <CardCharacterRemaining key={chara.name} data={chara} />
            ))}
          </HStack>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}

export default Characters
