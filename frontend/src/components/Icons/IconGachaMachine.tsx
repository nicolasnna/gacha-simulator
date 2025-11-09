import { Image } from '@chakra-ui/react'

interface IconProps {
  width?: number
}

export const IconGachaMachine = ({ width = 25 }: IconProps) => {
  return (
    <Image
      src="https://emojicdn.elk.sh/🎰?style=facebook"
      width={width}
      alt="Máquina gatcha"
    />
  )
}
