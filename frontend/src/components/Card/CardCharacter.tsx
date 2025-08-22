import type { Character } from '@/interfaces/character.interface'
import { Card, Circle, Float, Heading, Text } from '@chakra-ui/react'

interface CardCharacterProps {
  data: Character
}

function CardCharacter({ data }: CardCharacterProps) {
  return (
    <div className={`card-effect-${data.rarity}`}>
      <Card.Root
        bg="white"
        w={220}
        h={300}
        border={`3px solid`}
        borderColor={data.rarity}
        position="relative"
        zIndex={10}
        overflow="hidden"
      >
        <img src={data.imgUrl} alt={data.name} className="img-card" />
        {/* {!!data.repeatedCount && (
        <>
          <Float placement="top-end" zIndex={10} >
            <Circle size="7" bg="bg-secondary" border='2px solid' borderColor={data.rarity} color="white">
              {data.repeatedCount}
            </Circle>
          </Float>
        </>
      )} */}

        <Card.Header zIndex={10} p={0} px={2}>
          <Heading
            textAlign="end"
            color={data.rarity}
            fontSize={'3xl'}
            WebkitTextStroke="1px black"
          >
            {data.rarity.toUpperCase()}
          </Heading>
        </Card.Header>
        <Card.Footer
          justifyContent="start"
          alignItems="end"
          h="100%"
          zIndex={10}
          p={1}
          pl={3}
        >
          <Text
            textAlign="center"
            color="white"
            fontSize={'xl'}
            fontWeight="semibold"
            WebkitTextStroke="0.7px black"
          >
            {data.name}
          </Text>
        </Card.Footer>
      </Card.Root>
    </div>
  )
}

export default CardCharacter
