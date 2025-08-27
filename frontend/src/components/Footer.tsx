import { HStack, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <HStack gap={2} justifyContent="center" mt={5} bg="background/40" p={2}>
      <Text color="text" fontSize="sm">
        Nicolás Norambuena - derechos reservados
      </Text>
    </HStack>
  )
}
