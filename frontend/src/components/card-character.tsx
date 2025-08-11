import type { Character } from '@/interfaces/character.interface'
import { Card, Circle, Float, Heading, Text } from '@chakra-ui/react'

interface CardCharacterProps {
  data: Character
}

function CardCharacter({ data }: CardCharacterProps) {
  return (
    <Card.Root
      bg="white"
      w={200}
      h={250}
      border={`2px solid`}
      borderColor={data.rarity}
      position="relative"
      zIndex={10}
    >
      {!!data.repeatedCount && (
        <>
          <Float placement="top-end" zIndex={10} >
            <Circle size="7" bg="bg-secondary" border='2px solid' borderColor={data.rarity} color="white">
              {data.repeatedCount}
            </Circle>
          </Float>
          {/* <Float placement='top-start' offset={5}>
            <img src='https://emojicdn.elk.sh/🗑️?style=facebook' width={25}/>
          </Float> */}
        </>
      )}

      <Card.Header zIndex={10}>
        <Heading textAlign="end" color={data.rarity}>
          {data.rarity.toUpperCase()}
        </Heading>
      </Card.Header>
      <Card.Footer justifyContent="end" alignItems="end" h="100%" zIndex={10}>
        <Text textAlign="center">{data.name}</Text>
      </Card.Footer>
    </Card.Root>
  )
}

export default CardCharacter
