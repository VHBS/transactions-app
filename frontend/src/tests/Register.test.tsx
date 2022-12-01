import React from 'react'
import '@testing-library/jest-dom'
import {
  screen,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'
import renderWithRouter from './utils/renderWithRouter'
import axios from 'axios'

import { AuthProvider } from '../contexts/AuthContext'
import App from '../App'
import { axiosPostMock, userAlreadyExistMessageMock } from './mocks/axios/userMock'
afterEach(cleanup)

describe('Testing Register Component', () => {
  test('Success', async () => {
    renderWithRouter(
      <AuthProvider>
        <App />
      </AuthProvider>
    )

    jest.spyOn(axios, 'post').mockResolvedValue(axiosPostMock)

    const buttonRegister = screen.getByText(/register/i) as HTMLButtonElement
    expect(buttonRegister).toBeInTheDocument()

    fireEvent.click(buttonRegister)

    const inputUserName = screen.getByLabelText(/user name/i) as HTMLInputElement
    expect(inputUserName).toBeInTheDocument()

    const inputPassword = screen.getByLabelText(/password/i) as HTMLInputElement
    expect(inputPassword).toBeInTheDocument()

    const buttonConfirmForm = screen.getByText(/confirm/i) as HTMLButtonElement
    expect(buttonConfirmForm).toBeInTheDocument()

    const passwordRulesElement = screen.getByText(/password rules/i)
    expect(passwordRulesElement).toBeInTheDocument()

    fireEvent.change(inputUserName, { target: { value: 'Victor' } })
    fireEvent.change(inputPassword, { target: { value: 'Aa123456' } })
    fireEvent.click(buttonConfirmForm)

    const headerPageHome = await waitFor(() => screen.getByText(/home/i))
    expect(headerPageHome).toBeInTheDocument()

    const userNameHomePage = screen.getByText('Victor')
    expect(userNameHomePage).toBeInTheDocument()

    const balanceHomePage = screen.getByText('R$ 100,00')
    expect(balanceHomePage).toBeInTheDocument()
  })
  test('Fail - User already exists', async () => {
    renderWithRouter(
      <AuthProvider>
        <App />
      </AuthProvider>
    )

    jest.spyOn(axios, 'post').mockRejectedValue({ response: userAlreadyExistMessageMock })

    const buttonRegister = screen.getByText(/register/i) as HTMLButtonElement
    expect(buttonRegister).toBeInTheDocument()

    fireEvent.click(buttonRegister)

    const inputUserName = screen.getByLabelText(/user name/i) as HTMLInputElement
    expect(inputUserName).toBeInTheDocument()

    const inputPassword = screen.getByLabelText(/password/i) as HTMLInputElement
    expect(inputPassword).toBeInTheDocument()

    const buttonConfirmForm = screen.getByText(/confirm/i) as HTMLButtonElement
    expect(buttonConfirmForm).toBeInTheDocument()

    const passwordRulesElement = screen.getByText(/password rules/i)
    expect(passwordRulesElement).toBeInTheDocument()

    fireEvent.change(inputUserName, { target: { value: 'Victor' } })
    fireEvent.change(inputPassword, { target: { value: 'Aa123456' } })
    fireEvent.click(buttonConfirmForm)

    const messageError = await waitFor(() => screen.getByText(/message: user already exists/i))
    expect(messageError).toBeInTheDocument()

    const headerPageHome = await waitFor(() => screen.queryByText(/home/i))
    expect(headerPageHome).not.toBeInTheDocument()
  })
})
