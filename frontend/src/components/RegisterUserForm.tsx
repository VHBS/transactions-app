import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageErrorType } from '../@types/error'
import { UserType } from '../@types/user'

interface props {
  handleFormAction: (userName: string, password: string) => Promise<UserType | MessageErrorType>
}

export default function RegisterUserForm({ handleFormAction }: props): JSX.Element {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [eigthRuleColor, setEigthRuleColor] = useState<string>('grey')
  const [numberRuleColor, setNumberRuleColor] = useState<string>('grey')
  const [upperCaseRuleColor, setUpperCaseRuleColor] = useState<string>('grey')
  const [lowerCaseRuleColor, setLowerCaseRuleColor] = useState<string>('grey')

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [errorMessage])

  const handlePasswordRulesColor = (passwordValue: string, firstColor: string, secondColor: string): void => {
    const passwordValidateEigthChar: RegExp = /(?=.{8,})/
    const passwordValidateNumber: RegExp = /(?=[0-9])/
    const passwordValidateUpperCase: RegExp = /(?=[A-Z])/
    const passwordValidateLowerCase: RegExp = /(?=[a-z])/

    passwordValidateEigthChar.test(passwordValue)
      ? setEigthRuleColor(firstColor)
      : setEigthRuleColor(secondColor)
    passwordValidateNumber.test(passwordValue)
      ? setNumberRuleColor(firstColor)
      : setNumberRuleColor(secondColor)
    passwordValidateUpperCase.test(passwordValue)
      ? setUpperCaseRuleColor(firstColor)
      : setUpperCaseRuleColor(secondColor)
    passwordValidateLowerCase.test(passwordValue)
      ? setLowerCaseRuleColor(firstColor)
      : setLowerCaseRuleColor(secondColor)
  }

  const handleForm = async (): Promise<void> => {
    handlePasswordRulesColor(password, 'green', 'red')

    const responseHandleForm = await handleFormAction(userName, password)
    if ('token' in responseHandleForm) {
      return navigate('/')
    }
    if ('message' in responseHandleForm) {
      return setErrorMessage(responseHandleForm.message)
    }
  }

  const verifyPasswordRules = (value: string): void => {
    handlePasswordRulesColor(value, 'green', 'grey')

    return setPassword(value)
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
          onChange={({ target: { value } }) => verifyPasswordRules(value)}
        />
      </label>

      <button
        type="button"
        onClick={async () => await handleForm()}
      >
        Register
      </button>
      {errorMessage.length > 0
        ? (
          <div>
            <span style={ { fontWeight: 600 }}>Warn: </span>
            <span style={ { color: 'red', fontWeight: 600 }}>{errorMessage}</span>
          </div>)
        : null}

      <div>
        <h4>password rules</h4>
        <p style={ { color: eigthRuleColor, fontWeight: 600 }}>8 or more characters</p>
        <p style={ { color: numberRuleColor, fontWeight: 600 }}>have numbers</p>
        <p style={ { color: upperCaseRuleColor, fontWeight: 600 }}>have uppercase letters</p>
        <p style={ { color: lowerCaseRuleColor, fontWeight: 600 }}>have lowercase letters</p>
      </div>
    </div>
  )
}
