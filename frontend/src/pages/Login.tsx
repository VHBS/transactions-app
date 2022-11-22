import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(): JSX.Element {
  return (
    <div>
      <h1>Login</h1>
      <Link to='/register'>
        Register
      </Link>
    </div>
  )
}
