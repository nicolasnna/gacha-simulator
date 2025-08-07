import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        background: { value: "#1E1F36" },
        "bg-secondary": {value: "#2C2F4A"},
        primary: { value: "#FF4C98" },
        ssr: { value: "#FFD700" },
        sr: { value: "#B47BFF" },
        r: { value: "#66CCFF" },
        c: { value: "#CCCCCC" },
        text: { value: "#F4F4F5" }
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)