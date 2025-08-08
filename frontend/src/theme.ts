import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        background: {
          DEFAULT: { value: '#1E1F36' },
          200: { value: 'rgba(30, 31, 54, 0.2)' },
          400: { value: 'rgba(30, 31, 54, 0.4)' }
        },
        'bg-secondary': {
          DEFAULT: { value: '#2C2F4A' },
          200: { value: 'rgba(44, 47, 74, 0.2)' },
          400: { value: 'rgba(44, 47, 74, 0.4)' },
          600: { value: 'rgba(44, 47, 74, 0.6)' }
        },
        primary: { value: '#FF4C98' },
        ssr: { value: '#FFD700' },
        sr: { value: '#B47BFF' },
        r: { value: '#66CCFF' },
        c: { value: '#CCCCCC' },
        text: { value: '#F4F4F5' }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)
