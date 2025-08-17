import axios from 'axios'

export const getErrorMessageAxios = (error: unknown) => {
  if (!axios.isAxiosError(error)) return 'An unexpected error ocurred'

  if (error.response && error.response.data?.message)
    return error.response.data?.message

  return error.message
}
