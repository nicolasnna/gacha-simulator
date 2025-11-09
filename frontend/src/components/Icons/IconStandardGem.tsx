import { Image } from '@chakra-ui/react'

interface IconProps {
  width?: number
}

export const IconStandardGem = ({ width = 25 }: IconProps) => {
  return (
    <Image
      src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
      width={width}
      alt="Diamante"
    />
  )
}
