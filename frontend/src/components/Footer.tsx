import { HStack, Link, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <HStack
      gap={2}
      justifyContent="center"
      bg="background/40"
      p={2}
      pos="absolute"
      bottom={0}
      w="100%"
    >
      <Text color="text" fontSize="sm">
        Nicolás Norambuena -
      </Text>
      <Link
        color={'aquamarine'}
        href="https://github.com/nicolasnna"
        target="_blank"
      >
        GITHUB
      </Link>
    </HStack>
  )
}
