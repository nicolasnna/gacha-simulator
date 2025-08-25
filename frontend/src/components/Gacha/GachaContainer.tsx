import usePullGacha from '@/services/hooks/usePullGacha'
import { Button, Card, useDisclosure } from '@chakra-ui/react'
import GachaLottieAnimation from './GachaLottieAnimation'
import GachaResultPortal from './GachaResultPortal'
import { useEffect, useRef, useState } from 'react'

export default function GachaContainer() {
  const { open, onOpen, onClose } = useDisclosure()
  const { chars, handleOnePull, handleTenPulls } = usePullGacha()
  const [startAnimation, setStartAnimation] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (!startAnimation) lottieRef.current.stop()
  }, [startAnimation])

  const handlePullSeq = (pull: 1 | 10) => {
    setStartAnimation(true)
    lottieRef.current?.setSpeed(1.5)
    lottieRef.current?.play()
    if (pull === 1) handleOnePull()
    if (pull === 10) handleTenPulls()
  }

  const onCompletePull = () => {
    onOpen()
  }

  const closeResult = () => {
    onClose()
    lottieRef.current?.goToAndStop(0)
    setStartAnimation(false)
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
          onComplete={onCompletePull}
        />
        <Card.Footer spaceX={4}>
          <Button
            bg="primary"
            fontSize="xl"
            p={5}
            borderRadius={10}
            onClick={() => handlePullSeq(1)}
          >
            Tirar 1
          </Button>
          <Button
            bg="primary"
            fontSize="xl"
            p={5}
            borderRadius={10}
            onClick={() => handlePullSeq(10)}
          >
            Tirar 10
          </Button>
        </Card.Footer>
      </Card.Root>
      <GachaResultPortal open={open} onClose={closeResult} result={chars} />
    </>
  )
}
