import useHistoryGacha from '@/services/hooks/useHistoryGacha'
import {
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import { useEffect } from 'react'

function HistoryGacha() {
  const { history, updateHistory } = useHistoryGacha()

  useEffect(() => {
    if (history.length === 0) updateHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  return (
    <Container centerContent py={2} spaceY={4}>
      <HStack mt={2} flexWrap="wrap">
        <img
          src="https://emojicdn.elk.sh/%F0%9F%93%85?style=google"
          width={50}
          alt="Calendario"
        />
        <Heading size="4xl" color="text">
          Historial de tiradas
        </Heading>
      </HStack>

      <VStack alignItems={'start'} maxH={500} overflowY={'auto'} p={4}>
        {history.map((chara, idx) => (
          <Grid
            key={idx}
            bg="bg-secondary.600"
            px={5}
            py={2}
            borderRadius={10}
            w="100%"
            maxW="650"
            templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }}
            gap={2}
            alignItems="center"
          >
            <GridItem colSpan={1}>
              <img
                src="https://emojicdn.elk.sh/%F0%9F%8E%AF?style=google"
                width={25}
                alt="Icono conseguido"
              />
            </GridItem>
            <GridItem colSpan={7}>
              <HStack flexWrap="wrap" gapY={0}>
                <Text color="text">Has obtenido</Text>
                <Text color={chara.rarity}>{chara.name}</Text>
                <Text color="text">de rareza</Text>
                <Text color={chara.rarity}>{chara.rarity.toUpperCase()}</Text>
              </HStack>
            </GridItem>
            <GridItem colSpan={4}>
              <Text color="text">{chara.dateAt.toLocaleString()}</Text>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </Container>
  )
}

export default HistoryGacha
