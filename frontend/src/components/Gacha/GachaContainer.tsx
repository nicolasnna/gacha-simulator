import type { RoleType } from '@/interfaces/role.interface'
import type { CharPull } from '@/services/hooks/usePullGacha'
import usePullGacha from '@/services/hooks/usePullGacha'
import { useAppSelector } from '@/services/hooks/useRedux'
import { Button, HStack, Image, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import GachaLottieAnimation from './GachaLottieAnimation'
import GachaResultPortal from './GachaResultPortal'

export default function GachaContainer() {
  const { open, onOpen, onClose } = useDisclosure()
  const [typePull, setTypePull] = useState<'websocket' | 'fetch'>('websocket')
  const hookPull = usePullGacha(typePull)
  const [startAnimation, setStartAnimation] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null)
  const [characters, setCharacters] = useState<CharPull[]>([])
  const role = useAppSelector((s) => s.auth.userInfo?.role)
  const [disable, setDisable] = useState<boolean>(false)

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

  const disableDebounce = () => {
    setDisable(() => true)
    setTimeout(() => {
      setDisable(() => false)
    }, 4000)
  }

  return (
    <>
      <HStack
        gap={4}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          bg="primary"
          fontSize="xl"
          p={5}
          borderRadius={10}
          onClick={() => {
            disableDebounce()
            hookPull.handleOnePull()
          }}
          disabled={hookPull.isLoading || startAnimation || disable}
        >
          Tirar 1 ({' '}
          <Image
            src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
            width={25}
            alt="Diamante"
          />{' '}
          3 )
        </Button>
        <GachaLottieAnimation
          lottieRef={lottieRef}
          width={200}
          height={180}
          isShake={!startAnimation}
          onComplete={onOpen}
        />
        <Button
          bg="primary"
          fontSize="xl"
          p={5}
          borderRadius={10}
          onClick={() => {
            disableDebounce()
            hookPull.handleTenPulls()
          }}
          disabled={hookPull.isLoading || startAnimation || disable}
        >
          Tirar 10 ({' '}
          <Image
            src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
            width={25}
            alt="Diamante"
          />{' '}
          25)
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
      </HStack>

      <GachaResultPortal
        open={open}
        onClose={closeResult}
        result={characters}
      />
    </>
  )
}
