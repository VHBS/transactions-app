import React, { useEffect, useState } from 'react'

interface props {
  password: string
}

export default function PasswordRules({ password }: props): JSX.Element {
  const [eigthRuleColor, setEigthRuleColor] = useState<string>('grey')
  const [numberRuleColor, setNumberRuleColor] = useState<string>('grey')
  const [upperCaseRuleColor, setUpperCaseRuleColor] = useState<string>('grey')
  const [lowerCaseRuleColor, setLowerCaseRuleColor] = useState<string>('grey')

  useEffect(() => {
    handlePasswordRulesColor(password, 'green', 'grey')
  }, [password])

  const handlePasswordRulesColor = (
    passwordValue: string,
    firstColor: string,
    secondColor: string): void => {
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

  return (
    <div>
      <h4>password rules</h4>
      <p style={ { color: eigthRuleColor, fontWeight: 600 }}>8 or more characters</p>
      <p style={ { color: numberRuleColor, fontWeight: 600 }}>have numbers</p>
      <p style={ { color: upperCaseRuleColor, fontWeight: 600 }}>have uppercase letters</p>
      <p style={ { color: lowerCaseRuleColor, fontWeight: 600 }}>have lowercase letters</p>
    </div>
  )
}
