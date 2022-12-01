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
import { axiosPostMock, userAlreadyExistMessageMock, userNotExistMessageMock } from './mocks/axios/userMock'

afterEach(cleanup)

describe('Testing Login Component', () => {
  test('Success', async () => {
    renderWithRouter(
      <AuthProvider>
        <App />
      </AuthProvider>
    )

    jest.spyOn(axios, 'post').mockResolvedValue(axiosPostMock)

    const headerPagerRegister = screen.getByText(/register/i)
    expect(headerPagerRegister).toBeInTheDocument()

    const inputUserName = screen.getByLabelText(/user name/i) as HTMLInputElement
    expect(inputUserName).toBeInTheDocument()

    const inputPassword = screen.getByLabelText(/password/i) as HTMLInputElement
    expect(inputPassword).toBeInTheDocument()

    const buttonConfirmForm = screen.getByText(/confirm/i) as HTMLButtonElement
    expect(buttonConfirmForm).toBeInTheDocument()

    fireEvent.change(inputUserName, { target: { value: 'Victor' } })
    fireEvent.change(inputPassword, { target: { value: 'Aa123456' } })
    fireEvent.click(buttonConfirmForm)

    const headerPageHome = await waitFor(() => screen.getByText(/home/i))
    expect(headerPageHome).toBeInTheDocument()
  })

  test('Fail - User not exists', async () => {
    renderWithRouter(
      <AuthProvider>
        <App />
      </AuthProvider>
    )

    jest.spyOn(axios, 'post').mockRejectedValue({ response: userNotExistMessageMock })

    const inputUserName = screen.getByLabelText(/user name/i) as HTMLInputElement
    const inputPassword = screen.getByLabelText(/password/i) as HTMLInputElement
    const buttonConfirmForm = screen.getByText(/confirm/i) as HTMLButtonElement

    fireEvent.change(inputUserName, { target: { value: 'Victor' } })
    fireEvent.change(inputPassword, { target: { value: 'Aa123456' } })
    fireEvent.click(buttonConfirmForm)

    const messageError = await waitFor(() => screen.getByText(/message: user not exists/i))
    expect(messageError).toBeInTheDocument()

    const headerPageHome = await waitFor(() => screen.queryByText(/home/i))
    expect(headerPageHome).not.toBeInTheDocument()
  })
})
