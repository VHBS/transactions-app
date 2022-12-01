import React from 'react'
import { AuthContextType } from '../@types/authContext'
import UserForm from '../components/UserForm'
import useAuth from '../hooks/useAuth'

export default function Register (): JSX.Element {
  const { handleUserRegister } = useAuth() as AuthContextType

  return (
    <div>
      <h1>Register</h1>
      <UserForm
        showPasswordRules={true}
        handleFormAction={handleUserRegister}
      />
    </div>
  )
}
