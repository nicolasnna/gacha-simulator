import type { RarityType } from '@/interfaces/rarity.interface'
import { type Dispatch, type SetStateAction } from 'react'
import usePullGachaFetch from './usePullGachaFetch'
import usePullGachaWebsocket from './usePullGachaWebsocket'

export type PullMode = 'fetch' | 'websocket'

export interface CharPull {
  name: string
  rarity: RarityType
  imgUrl: string
  isDuplicate: boolean
}

export interface UsePullGacha {
  chars: CharPull[]
  setChars: Dispatch<SetStateAction<CharPull[]>>
  isLoading: boolean
  isError: boolean
  handleTenPulls: (bannerId: string) => Promise<void>
  handleOnePull: (bannerId: string) => Promise<void>
}

export default function usePullGacha(mode: PullMode) {
  const hookWs = usePullGachaWebsocket()
  const hookFetch = usePullGachaFetch()

  return mode === 'websocket' ? hookWs : hookFetch
}
