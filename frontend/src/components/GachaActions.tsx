import usePullGacha from '@/services/hooks/usePullGacha'
import {
  Box,
  Button,
  Center,
  HStack,
  Portal,
  Presence,
  useDisclosure
} from '@chakra-ui/react'
import CardCharacterGacha from './Card/CardCharacterGacha'

export default function GatchaActions() {
  const { open, onOpen, onClose } = useDisclosure()
  const { chars, handleOnePull, handleTenPulls } = usePullGacha()

  const onePull = () => {
    handleOnePull().then(() => onOpen())
  }

  const tenPull = () => {
    handleTenPulls().then(() => onOpen())
  }

  return (
    <>
      <HStack gap={4}>
        <Button
          bg="primary"
          fontSize="xl"
          p={5}
          borderRadius={10}
          onClick={onePull}
        >
          Tirar 1
        </Button>
        <Button
          bg="primary"
          fontSize="xl"
          p={5}
          borderRadius={10}
          onClick={tenPull}
        >
          Tirar 10
        </Button>
      </HStack>

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
            onClick={() => onClose()}
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
                {chars.map((char, idx) => (
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
    </>
  )
}
