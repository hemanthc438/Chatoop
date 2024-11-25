import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import nodp from "../assets/noDp.png"
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const HomeHeader = ({userData}) => {
  const navigate = useNavigate()
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
  return (
    <>
    <div className='flex flex-col min-h-[500px] bg-neutral-800/40 hover:bg-neutral-800/20 items-start justify-start rounded-2xl'>
        <div className='m-3'>
            <h1 className='text-3xl font-sourgummy text-neutral-400'>Chatoop</h1>
        </div>
        <div className='flex flex-col flex-grow justify-between w-full'>
        <div className='flex flex-col m-5 gap-5'>
          <div className='flex flex-row items-center border-b border-b-neutral-900 rounded-2xl cursor-pointer group' >
              <FontAwesomeIcon className="fa-2x fa-solid text-neutral-400 group-hover:text-white" icon={faHouse} />
              <span className='p-4 text-xl text-neutral-400 group-hover:text-white'>Home</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 cursor-pointer group'>
              <FontAwesomeIcon className="fa-2x text-neutral-400 group-hover:text-white" icon={faMagnifyingGlass} />
              <span className='p-4 text-xl text-neutral-400 group-hover:text-white'>Search</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 cursor-pointer group'>
              <FontAwesomeIcon className="fa-2x text-neutral-400 group-hover:text-white" icon={faRocketchat} />
              <span className='p-4 text-xl text-neutral-400 group-hover:text-white'>Chats</span>
            </div>
            <div className='flex flex-row items-center border-b border-b-neutral-900 group'>
              <FontAwesomeIcon className="fa-2x text-neutral-400 group-hover:text-white" icon={faUser} />
              <span className='p-4 text-xl text-neutral-400 group-hover:text-white'>Profile</span>
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
          <h1 className='text-xl font-bold text-white'>{userData?.displayName}</h1>
          <h1 className='text-neutral-400'>{userData?.email}</h1>
        </div>
    </div>
    </>
  )
}

export default HomeHeader