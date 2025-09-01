import type { CharPull } from '@/services/hooks/usePullGacha'
import usePullGacha from '@/services/hooks/usePullGacha'
import { Button, Card, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import GachaLottieAnimation from './GachaLottieAnimation'
import GachaResultPortal from './GachaResultPortal'
import { useAppSelector } from '@/services/hooks/useRedux'
import type { RoleType } from '@/interfaces/role.interface'

export default function GachaContainer() {
  const { open, onOpen, onClose } = useDisclosure()
  const [typePull, setTypePull] = useState<'websocket' | 'fetch'>('fetch')
  const hookPull = usePullGacha(typePull)
  const [startAnimation, setStartAnimation] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null)
  const [characters, setCharacters] = useState<CharPull[]>([])
  const role = useAppSelector((s) => s.auth.userInfo?.role)

  const roleForMode: RoleType[] = ['developer', 'superAdmin']

  useEffect(() => {
    if (!startAnimation) lottieRef.current.stop()
    if (hookPull.isError) {
      lottieRef.current.stop()
      setStartAnimation(false)
      onClose()
    }
    if (characters.length === 0 && hookPull.chars.length !== 0) {
      setStartAnimation(true)
      lottieRef.current?.setSpeed(1.5)
      lottieRef.current?.play()
      setCharacters(hookPull.chars)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation, hookPull.isError, hookPull.chars])

  const closeResult = () => {
    onClose()
    lottieRef.current?.goToAndStop(0)
    setStartAnimation(false)
    setCharacters([])
    hookPull.setChars([])
  }

  return (
    <>
      <Card.Root
        width="18rem"
        alignItems="center"
        bg="bg-secondary.400"
        borderRadius={15}
        border="none"
        pos="relative"
        w="max-content"
      >
        <img
          src="https://emojicdn.elk.sh/%E2%84%B9?style=google"
          width={25}
          alt="Información"
          style={{ position: 'absolute', top: '5%', right: '10%' }}
        />
        <GachaLottieAnimation
          lottieRef={lottieRef}
          width={300}
          height={300}
          isShake={!startAnimation}
          onComplete={() => onOpen()}
        />
        <Card.Footer spaceX={4}>
          <Button
            bg="primary"
            fontSize="xl"
            p={5}
            borderRadius={10}
            onClick={() => hookPull.handleOnePull()}
            disabled={hookPull.isLoading || startAnimation}
          >
            Tirar 1
          </Button>
          <Button
            bg="primary"
            fontSize="xl"
            p={5}
            borderRadius={10}
            onClick={() => hookPull.handleTenPulls()}
            disabled={hookPull.isLoading || startAnimation}
          >
            Tirar 10
          </Button>
          {roleForMode.includes(role as RoleType) && (
            <Button
              variant="outline"
              color="text"
              _hover={{ color: 'primary', borderColor: 'primary' }}
              onClick={() =>
                setTypePull(typePull === 'websocket' ? 'fetch' : 'websocket')
              }
            >
              {typePull === 'websocket' ? 'Websocket' : 'Fetch'}
            </Button>
          )}
        </Card.Footer>
      </Card.Root>
      <GachaResultPortal
        open={open}
        onClose={closeResult}
        result={characters}
      />
    </>
  )
}
