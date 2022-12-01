import { useContext } from 'react'

import { AuthContextType } from '../@types/authContext'
import { AuthContext } from '../contexts/AuthContext'

export default function useAuth(): AuthContextType | null {
  const value = useContext(AuthContext)
  return value
}
