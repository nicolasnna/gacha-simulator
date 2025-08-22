import type { RarityType } from '@/interfaces/rarity.interface'
import { Box, Card } from '@chakra-ui/react'

interface CardCharacterGachaProps {
  charPull: {
    name: string
    rarity: RarityType
    imgUrl: string
    isDuplicate: boolean
  }
}

export default function CardCharacterGacha({
  charPull
}: CardCharacterGachaProps) {
  return (
    <div className={`card-effect-${charPull.rarity}`}>
      <Card.Root
        w={140}
        h={230}
        border="3px solid"
        position="relative"
        borderColor={charPull.rarity}
        overflow="hidden"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'xl'
        }}
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          backgroundImage={`url(${charPull.imgUrl})`}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="8px"
          zIndex={2}
          transition="all 0.3s ease"
        />
      </Card.Root>
    </div>
  )
}
