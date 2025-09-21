import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login && SignUp/Login/Login'
import VerifyOtp from './pages/Login && SignUp/VerifyOTP/VerifyOTP'
import ResetOTPVerify from './pages/Login && SignUp/ResetOTPVerify'
import ResetPassword from './pages/Login && SignUp/ResetPassword'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/verify-account' element={<VerifyOtp />}/>
      <Route path='/verify-reset-account' element={<ResetOTPVerify />}/>
      <Route path='/reset-password' element={<ResetPassword />}/>
    </Routes>
    </>
  )
}

export default App
