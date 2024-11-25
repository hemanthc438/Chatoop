import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StarryParticles from '../components/StarryParticles'
import HomeBody from '../components/HomeBody'
import HomeFC from '../components/HomeFC'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import nodp from "../assets/noDp.png"
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth';
import Search from '../components/Search'
import Profile from '../components/Profile'

const Home = () => {
    const userData = useLocation().state
    const navigate = useNavigate()
    const [state,setState] = useState('home')
    userData.displayName=!!(userData?.displayName)?userData?.displayName:userData?.email.split("@")[0]
    userData.displayPic=(userData?.displayPic==null)?nodp:userData?.displayPic
      const handleLogout = async() => {
        try{
          await signOut(auth)
          navigate('/')
        }catch(e){
          alert(e.message)
        }
      }
      const handleSearchState = () =>{
        setState('search')
      }
  return (

    <div className="relative">
      <StarryParticles />
        <div className="grid m-3 w-full grid-cols-3 sm:grid-cols-12 gap-3">
          <div className="col-span-3 xl:col-span-3 sticky top-0">
          <div className='flex flex-col p-3 min-h-[500px] bg-neutral-800/40 hover:bg-neutral-800/20 items-start justify-start rounded-2xl sm:block hidden'>
        <div className='m-3'>
            <h1 className='text-3xl font-sourgummy text-neutral-400'>Chatoop</h1>
        </div>
        <div className='flex flex-col flex-grow justify-between w-full'>
        <div className='flex flex-col m-5 gap-5'>
          <div className='flex flex-row items-center border-b border-b-neutral-900 rounded-2xl cursor-pointer group' >
              <FontAwesomeIcon className={`fa-2x fa-solid text-neutral-400 ${state=='home'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} icon={faHouse} />
              <span className={`p-4 text-xl text-neutral-400 ${state=='home'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} onClick={()=>setState('home')}>Home</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 cursor-pointer group'>
              <FontAwesomeIcon className={`fa-2x text-neutral-400 ${state=='search'?"text-white group-hover:text-white":"group-hover:text-neutral-300 "}`} icon={faMagnifyingGlass} />
              <span className={`p-4 text-xl text-neutral-400 ${state=='search'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} onClick={()=>handleSearchState()}>Search</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 cursor-pointer group'>
              <FontAwesomeIcon className={`fa-2x text-neutral-400 ${state=='chats'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} icon={faRocketchat} />
              <span className={`p-4 text-xl text-neutral-400 ${state=='chats'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} onClick={()=>setState('chats')}>Chats</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 cursor-pointer group'>
              <FontAwesomeIcon className={`fa-2x text-neutral-400 ${state=='profile'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} icon={faUser} />
              <span className={`p-4 text-xl text-neutral-400 ${state=='profile'?"text-white group-hover:text-white":"group-hover:text-neutral-300"}`} onClick={()=>setState('profile')}>Profile</span>
            </div>
            <button 
              className="bg-white my-4 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
            
          </div>
    </div>
    <div className='flex flex-row mt-3 min-h-[200px] bg-neutral-800/40 hover:bg-neutral-800/20 items-start justify-start rounded-2xl'>
        <div className='h-[100px] w-[100px] m-5'>
          <img src={userData?.displayPic} className='w-full h-full rounded-full'/>
        </div>
        <div className='flex flex-col my-auto pb-8 border-b border-b-neutral-900'>
          <h1 className='text-xl text-white'>{userData?.displayName}</h1>
          <h1 className='text-neutral-400'>{userData?.email}</h1>
        </div>
    </div>
          </div>
          <div className="col-span-6 xl:col-span-6 h-screen overflow-y-auto">
            {state=='home' && <HomeBody userData={userData}/>}
            {state=='search' && <Search userData={userData}/>}
            {state=='profile' && <Profile userData={userData}/>}
          </div>
          <div className="col-span-3 xl:col-span-3">
            {state=='home' && <HomeFC userData={userData}/>}
          </div>
        </div>
        </div>
  )
}

export default Home