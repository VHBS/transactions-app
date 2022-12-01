import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContextType } from '../@types/authContext'
import UserForm from '../components/UserForm'
import useAuth from '../hooks/useAuth'

export default function Login(): JSX.Element {
  const { handleUserLogin } = useAuth() as AuthContextType

  return (
    <div>
      <h1>Login</h1>
      <UserForm
        showPasswordRules={false}
        handleFormAction={handleUserLogin}
      />
      <Link to='/register'>
        Register
      </Link>
    </div>
  )
}
