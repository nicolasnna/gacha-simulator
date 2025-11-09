import { Image } from '@chakra-ui/react'

interface IconProps {
  width?: number
}

export const IconPromotionalGem = ({ width = 25 }: IconProps) => {
  return (
    <Image
      src="https://emojicdn.elk.sh/%F0%9F%92%8E?style=google"
      width={width}
      alt="Diamante"
      style={{
        filter: 'sepia(100%) saturate(300%) brightness(1.2) hue-rotate(-10deg)'
      }}
    />
  )
}
