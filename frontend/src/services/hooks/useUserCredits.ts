import { useEffect, useState } from 'react'

export function useUserCredits() {
  const [credits, setCredits] = useState<number>(0)

  // useEffect(() => {
  //   if (!socket) return

  //   socket.on('credits-recharged', () => {
  //     console.log('Creditos recargados revisar')
  //   })

  //   return () => {
  //     socket.off('credits-recharged')
  //   }
  // }, [socket])

  return { credits }
}
