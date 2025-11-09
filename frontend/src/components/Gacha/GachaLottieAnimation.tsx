import chestAnimation from '@/assets/gacha-lottie.json'
import { Box } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import { type RefObject } from 'react'

interface Props {
  onComplete: () => void
  width?: string | number
  height?: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lottieRef: RefObject<any>
  isShake?: boolean
}

export default function GachaLottieAnimation({
  onComplete,
  width,
  height,
  lottieRef,
  isShake
}: Readonly<Props>) {
  return (
    <Box w={width} h={height}>
      <Lottie
        lottieRef={lottieRef}
        animationData={chestAnimation}
        loop={false}
        autoPlay={false}
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
        className={isShake ? 'shake-animation' : ''}
      />
    </Box>
  )
}
