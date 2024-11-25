import React, { useState } from 'react'
import ParticleBg from '../components/ParticleBg'
import { useNavigate } from 'react-router-dom'
import googleLogo from '../assets/googleLogo.png'
import microsoftLogo from '../assets/microsoftLogo.png'
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth'
import { auth, db, googleAuth } from '../../firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const SignUp = () => {
    const navigate = useNavigate()
    const [isValid,setIsValid] = useState(true)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [fullname,setFullname] = useState("")
   const handleLogin = () =>{
    navigate('/')
   } 
   const checkInputs = () =>{
    if(email=="" || password=="" || username=="" || fullname=="")
        {alert("PLease enter all the fields")
        setIsValid(false)
    }
    else if(password.length<6){
        alert("password should be more than 6 letters/digits")
        setIsValid(false)
    }
   }
   const handleSignUp = async (e) =>{
    e.preventDefault()
    try{
        setIsValid(true)
        checkInputs() 
        if(!isValid)return
        const response = await createUserWithEmailAndPassword(auth,email,password)
        const userDocRef = doc(db, 'users', response?.user?.uid);
        await setDoc(userDocRef,{
            username,
            fullname,
            email,
            userId : response?.user?.uid,
            createdAt : serverTimestamp()
        })
        const postsDocRef = doc(db, 'posts', response?.user?.uid);
        // await setDoc(postsDocRef,{
        //     createdBy:username,
        //     fullname,
        //     email,
        //     userId : response?.user?.uid,
        //     createdAt : serverTimestamp()
        // })
        navigate('/home',{state:{uid: response?.user?.uid,
            email: email,
            displayName: username,
            displayPic: null
            }})
    }catch(err){
        if(err.message.includes("auth/invalid-email"))
        alert("please use a valid email id")
    }
   }
  return (
    <>
    <ParticleBg/>
    <div className='min-h-screen flex items-center justify-center'>
        <div className='m-5 flex bg-neutral-500 w-[500px] h-auto items-center justify-center bg-neutral-500/50 rounded-2xl'>
            <div className='flex flex-col gap-4 w-[75%] m-5'>
                <div className='flex-row'>
                    <h1 className='text-center text-4xl font-bold font-sourgummy text-neutral-400' >Chatoop</h1>
                    <h1 className='text-center text-2xl font-bold font-sourgummy ' >SignUp</h1>
                </div>
                <input 
                    type='email' 
                    placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-3 bg-neutral-900 text-white rounded-xl '/>
                <input 
                    type='password' 
                    placeholder="Password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    className='p-3 bg-neutral-900 text-white rounded-xl w-full'/>
                <input type='text' 
                    placeholder="Full name" 
                    onChange={(e)=>setFullname(e.target.value)}
                    className='p-3 bg-neutral-900 text-white rounded-xl w-full'/>
                <input type='text' 
                    placeholder="Username" 
                    onChange={(e)=>setUsername(e.target.value)}
                    className='p-3 bg-neutral-900 text-white rounded-xl w-full'/>
                    <button 
                      onClick={handleSignUp}
                      className='w-full hover btn p-2 bg-slate-400 hover:bg-slate-500 text-black rounded-xl hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out'>SignUp</button>
                <div className='flex justify-center'>
                <p className='text-black text-center pr-2'>Already have an account? </p><span className='text-red-500 cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out' onClick={handleLogin}>Login</span>
                      </div>
             </div>
        </div>
    </div>
    </>
  )
}

export default SignUp