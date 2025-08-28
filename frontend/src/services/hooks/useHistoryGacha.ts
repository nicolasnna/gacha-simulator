import type { RarityType } from '@/interfaces/rarity.interface'
import axios from 'axios'
import { useState } from 'react'

export interface HistoryPull {
  idPullUnique: string
  anime: string
  name: string
  rarity: RarityType
  imgUrl: string
  isDuplicate: boolean
  dateAt: Date
}

interface RawHistoryPull {
  id: string
  userId: string
  animeOrigin: string
  pullsCount: number
  items: Array<{
    name: string
    rarity: string
    imgUrl: string
    isDuplicate: boolean
  }>
  createdAt: string
}

interface HistoryResponse {
  data: RawHistoryPull[]
  totalItems: number
  lastItemNumber: number
  page: number
  limit: number
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export default function useHistoryGacha() {
  const [history, setHistory] = useState<HistoryPull[]>([])
  const [page, setPage] = useState<number>(1)

  const fetchHistory = async (page: number) => {
    const res = await axios.get(
      `${BACKEND_URL}/gacha/history?page=${page}&limit=20`
    )
    return res.data as HistoryResponse
  }

  const updateHistory = async () => {
    try {
      const fetchRes = await fetchHistory(page)
      const pulls = fetchRes.data

      let pullsProccessed: HistoryPull[] = []

      for (const pull of pulls) {
        const itemsInPull = pull.items.map((char, idx) => ({
          idPullUnique: `${pull.id}-${idx}`,
          anime: pull.animeOrigin,
          name: char.name,
          rarity: char.rarity as RarityType,
          imgUrl: char.imgUrl,
          isDuplicate: char.isDuplicate,
          dateAt: new Date(pull.createdAt)
        }))
        pullsProccessed = [...pullsProccessed, ...itemsInPull]
      }

      const merged = [...history, ...pullsProccessed]
      const unique = Array.from(
        new Map(merged.map((item) => [item.idPullUnique, item])).values()
      )
      setHistory(() => unique)
      setPage((s) => s + 1)
    } catch (err) {
      console.error(`Error updateHistory: ${err}`)
    }
  }

  return { history, updateHistory }
}
