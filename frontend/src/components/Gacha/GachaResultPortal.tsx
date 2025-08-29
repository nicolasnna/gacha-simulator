import type { CharPull } from '@/services/hooks/usePullGachaFetch'
import { Box, Center, HStack, Portal, Presence } from '@chakra-ui/react'
import CardCharacterGacha from '../Card/CardCharacterGacha'

interface GachaResultPortalProp {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  result: CharPull[]
}

export default function GachaResultPortal({
  open,
  onClose,
  result
}: GachaResultPortalProp) {
  return (
    <Portal>
      <Presence
        present={open}
        animationName={{ _open: 'fade-in', _closed: 'fade-out' }}
        animationDuration="moderate"
      >
        <Center
          position="fixed"
          top={0}
          left={0}
          minW="100vw"
          minH="100vh"
          bg="background/60"
          zIndex="modal"
          onClick={onClose}
        >
          <Box
            overflow="auto"
            maxWidth="95vw"
            onWheel={(e) => {
              if (e.deltaY === 0) return
              e.preventDefault()
              // e.currentTarget.scrollLeft += e.deltaY
              const scrollAmount = e.deltaY * 1.5
              e.currentTarget.scrollTo({
                left: e.currentTarget.scrollLeft + scrollAmount,
                behavior: 'smooth'
              })
            }}
          >
            <HStack
              p={10}
              alignItems="center"
              justifyContent="center"
              minWidth="max-content"
            >
              {result.map((char, idx) => (
                <CardCharacterGacha
                  key={`${char.name} ${idx}`}
                  charPull={char}
                />
              ))}
            </HStack>
          </Box>
        </Center>
      </Presence>
    </Portal>
  )
}
