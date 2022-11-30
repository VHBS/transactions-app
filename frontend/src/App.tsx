import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRouter from './router/PrivateRouter'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
