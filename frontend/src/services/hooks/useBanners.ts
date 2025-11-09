import type { Banner } from '@/interfaces/banner.interface'
import axios from 'axios'
import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([])

  const getBanners = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/banners`)
      const data = res.data.data
      setBanners(data)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    banners,
    getBanners
  }
}
