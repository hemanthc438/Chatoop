import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorBg from '../components/ErrorBg'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleLogout = async() => {
      try{
        auth.signOut()
        navigate('/')
      }catch(e){
        alert(e.message)
      }
  }
  return (
    <>
      <ErrorBg/>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='m-5 flex bg-neutral-500 w-[500px] h-auto items-center justify-center bg-neutral-500/50 rounded-2xl'>
            <div className='flex flex-col gap-4 w-[75%] m-5'>
                    <h1 className='text-center text-4xl font-bold font-sourgummy text-neutral-400' >Chatoop</h1>
                <div className='flex justify-center'>
                <p className='text-black text-center pr-2'>Can't find the page? </p><span className='text-red-500 cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out' onClick={handleLogout}>Logout</span>
                      </div>
             </div>
            </div>
    </div>
    </>
  )
}



export default ErrorPage