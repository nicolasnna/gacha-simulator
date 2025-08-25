import chestAnimation from '@/assets/gacha-lottie.json'
import Lottie from 'lottie-react'
import { type RefObject } from 'react'

interface Props {
  onComplete: () => void
  width: number
  height: number
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
}: Props) {
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={chestAnimation}
      loop={false}
      autoPlay={false}
      onComplete={onComplete}
      width={width}
      height={height}
      className={isShake ? 'shake-animation' : ''}
    />
  )
}
