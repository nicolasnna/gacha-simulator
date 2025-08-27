import type { Character } from '@/interfaces/character.interface'
import { Card, Heading, Text } from '@chakra-ui/react'

interface CardCharacterProps {
  data: Character
}

function CardCharacterRemaining({ data }: CardCharacterProps) {
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
        <img
          src={data.imgUrl}
          alt={data.name}
          className="img-card"
          style={{ filter: 'grayscale(100%)' }}
        />
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

export default CardCharacterRemaining
