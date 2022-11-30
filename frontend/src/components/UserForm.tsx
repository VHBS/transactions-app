import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MessageErrorType } from '../@types/error'
import { UserType } from '../@types/user'
import PasswordRules from './PasswordRules'

interface props {
  showPasswordRules: boolean
  handleFormAction: (userName: string, password: string) => Promise<UserType | MessageErrorType>
}

export default function UserForm({ handleFormAction, showPasswordRules }: props): JSX.Element {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const handleForm = async (): Promise<void> => {
    const responseHandleForm = await handleFormAction(userName, password)
    if ('token' in responseHandleForm) {
      return navigate('/')
    }
    if ('message' in responseHandleForm) {
      return setErrorMessage(responseHandleForm.message)
    }
  }

  return (
    <div>
      <label>
        <span>User name</span>
        <input
          type='text'
          onChange={({ target: { value } }) => setUserName(value)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type='password'
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </label>

      {errorMessage.length > 0
        ? (
          <div>
            <span>Message: {errorMessage}</span>
          </div>)
        : null}

      <Outlet />
      {
        showPasswordRules ? <PasswordRules password={password} /> : null
      }
      <button
        type="button"
        onClick={async () => await handleForm()}
      >
        Confirm
      </button>
    </div>
  )
}
