import axios from 'axios'
import { MessageErrorType } from '../@types/error'
import { UserType } from '../@types/user'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const handleFetchUserRegister = async (
  userName: string,
  password: string
): Promise<UserType | MessageErrorType> => {
  const { data } = await api.post('/user', {
    userName,
    password
  }).catch((error) => {
    if ('response' in error) {
      return error.response
    }
  })

  return data
}
