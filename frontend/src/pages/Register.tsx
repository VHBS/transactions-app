import React from 'react'
import { AuthContextType } from '../@types/authContext'
import RegisterUserForm from '../components/RegisterUserForm'
import useAuth from '../hooks/useAuth'

export default function Register (): JSX.Element {
  const { handleUserRegister } = useAuth() as AuthContextType

  return (
    <div>
      <h1>Register</h1>
      <RegisterUserForm
        handleFormAction={handleUserRegister}
      />
    </div>
  )
}
