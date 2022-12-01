import React from 'react'
import { AuthContextType } from '../@types/authContext'
import { UserType } from '../@types/user'
import useAuth from '../hooks/useAuth'
import convertCurrency from '../utils/toLocaleCurrency'

export default function Home(): JSX.Element {
  const { userData } = useAuth() as AuthContextType
  const { user: { userName, account: { balance } } } = userData as UserType

  return (
    <div>
      <h1>Home</h1>
      <h3>{userName}</h3>
      <p>{convertCurrency(balance)}</p>
    </div>
  )
}
