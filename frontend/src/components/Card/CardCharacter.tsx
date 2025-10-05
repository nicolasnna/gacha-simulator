import type { CharacterObtained } from '@/interfaces/character.interface'
import { Card, Circle, Float, Heading, Text } from '@chakra-ui/react'

interface CardCharacterProps {
  data: CharacterObtained
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
        {!!data.repeatCount && (
          <>
            <Float placement="top-start" left={5} top={5} zIndex={10}>
              <Circle
                size="7"
                bg="bg-secondary"
                border="2px solid"
                borderColor={data.rarity}
                color={data.rarity}
              >
                {data.repeatCount}
              </Circle>
            </Float>
          </>
        )}
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
          p={0}
        >
          <Text
            textAlign="center"
            color="text"
            fontSize={'2xl'}
            fontWeight="bold"
            WebkitTextStroke="0.8px black"
            bg="background/40"
            p={1}
            w="100%"
          >
            {data.name}
          </Text>
        </Card.Footer>
      </Card.Root>
    </div>
  )
}

export default CardCharacter
