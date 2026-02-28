import { Box, Center, HStack, Portal, Presence } from '@chakra-ui/react'
import CardCharacterGacha from '../Card/CardCharacterGacha'
import type { CharPull } from '@/services/hooks/usePullGacha'

interface GachaResultPortalProp {
  open: boolean
  onClose: () => void
  result: CharPull[]
}

export default function GachaResultPortal({
  open,
  onClose,
  result
}: Readonly<GachaResultPortalProp>) {
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
          <HStack
            px={4}
            py={20}
            alignItems="center"
            justifyContent="center"
            minWidth="100%"
            flexWrap="wrap"
            gap={8}
          >
            {result.map((char, idx) => (
              <Box
                key={`${char.name} ${idx}`}
                data-state="open"
                opacity={0}
                _open={{
                  animation: `slide-from-top 400ms ease-out, fade-in 400ms ease-out`,
                  animationDelay: `${idx * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <CardCharacterGacha
                  key={`${char.name} ${idx}`}
                  charPull={char}
                />
              </Box>
            ))}
          </HStack>
        </Center>
      </Presence>
    </Portal>
  )
}
