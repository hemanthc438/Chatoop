import React, { useState } from 'react'
import googleLogo from '../assets/googleLogo.png'
import microsoftLogo from '../assets/microsoftLogo.png'
import ParticleBg from "../components/ParticleBg"
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleAuth } from '../../firebaseConfig'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

const Login = () => {
    const navigate = useNavigate()
    const [ email,setEmail ] = useState("")
    const [ password,setPassword ] = useState("");
    const [user,setUser] = useState({})
    const [isAuthenticated,setIsAuthenticated] = useState(false)
   

    const handleLogin = async() =>{
        try{
            const response = await signInWithEmailAndPassword(auth,email,password)
            const user = response?.user
            const userDocRef = doc(db, 'users', response?.user?.uid);
            const docSnap = await getDoc(userDocRef)
            if(docSnap.exists()){
                await updateDoc(userDocRef,{
                    lastLoggedIn: serverTimestamp()
            })
            }
            navigate('/home',{state:{uid: response?.user?.uid,
                email: response?.user?.email,
                displayName: response?.user?.displayName,
                displayPic: response?.user.photoURL
                }})
        }catch(err){
            if(e.message.includes("auth/invalid-email"))
                alert("Please give a valid email")
        }
    }
    const handleSignup = () => {
        navigate('/signup')
    }
    const handleGoogleSignin = async(e) => {
        e.preventDefault()
        try{
            const response = await signInWithPopup(auth,googleAuth)
            const userDocRef = doc(db, 'users', response?.user?.uid);
            const docSnap = await getDoc(userDocRef)
            if(!docSnap.exists()){
                await setDoc(userDocRef,{
                username: response?.user?.displayName.replaceAll(" ",""),
                fullname: response?.user?.displayName,
                email : response?.user?.email,
                userId : response?.user?.uid,
                createdAt : serverTimestamp(),
                photoURL:null
                })
            }else{
                await updateDoc(userDocRef,{
                    lastLoggedIn: serverTimestamp()
            })
            }
            navigate('/home',{state:{uid: response?.user?.uid,
                email: response?.user?.email,
                displayName: response?.user?.displayName,
                displayPic: null
                }})
        }catch(e){
            if(e.message.includes("auth/invalid-email"))
                alert("Please give a valid email")
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
                    <h1 className='text-center text-2xl font-bold font-sourgummy' >Login</h1>
                </div>
                <input 
                    type='text' 
                    placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-3 bg-neutral-900 text-white rounded-xl '/>
                <div className='flex flex-col gap-1'>
                    <input 
                        type='password' 
                        placeholder="Password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        className='p-3 bg-neutral-900 text-white rounded-xl w-full'/>
                <div className='flex justify-end'>
                    <span className='text-red-500 cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out'>forgot password?</span></div></div>
                <div className='flex flex-col gap-1 '>
                    <button 
                      onClick={handleLogin}
                      className='w-full hover btn p-2 bg-slate-400 hover:bg-slate-500 text-black rounded-xl hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out'>Login</button>
                   <span className='text-center mx-auto'>or</span>
                <div className='flex justify-center items-center gap-5'>
                    <img src={googleLogo} onClick={handleGoogleSignin} className='max-h-[40px] max-w-[40px] cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out'></img>
                    <img src={microsoftLogo} className='max-h-[35px] max-w-[35px] cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out'></img>
                </div>
                <div className='flex justify-center'>
                <p className='text-black text-center pr-2'>Don't have an account? </p><span className='text-red-500 cursor-pointer hover:scale-105
                      active:scale-95 transition-all duration-200 ease-in-out' onClick={handleSignup}>SignUp</span>
                      </div>
             </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login