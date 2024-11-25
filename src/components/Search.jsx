import { getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { usersRef } from '../../firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import nodp from "../assets/noDp.png"
import nobg from '../assets/noBgg.png'
import ProfilePosts from './profilePosts'
const Search = ({userData}) => {
    let searchCode=""
    const [users,setUsers] = useState([])
    const [displayUsers,setDisplayUsers] = useState([])
    const [state,setState] = useState('search')
    const [profState,setProfState] = useState('posts')
    const [user,setUser] = useState()
    let profileData = {}

    useEffect(()=>{
       getUsers()
    },[])
    const getUsers = async()=>{
        try{
            const q = query(usersRef, where("userId","!=",userData?.uid))
            const querySnapshot = await getDocs(q)
            let data=[]
            querySnapshot.forEach(doc=>{
                data.push({...doc.data()})
            })
            setUsers(data)
        }catch(e){
            alert(e.message)
        }
    }
    const onSearch = (code) => {
        searchCode=code
            if(searchCode){
            setDisplayUsers(users.filter(user =>
                user?.fullname.toLowerCase().includes(searchCode.toLowerCase())
            ))
        }
        else{
            setDisplayUsers([])
        }
    }
    const handleProfile = (user) =>{
        setUser(user)
        setState('profileCard')
        profileData={
            uid: user?.userId,
            email: user?.email,
            displayName: user?.username,
            displayPic: null
        }
    }
  return (
    <>
    {state=='search' && (<div className='flex flex-col h-screen mx-2 bg-neutral-800/40 hover:bg-neutral-800/20 rounded-2xl border-box'>
        <div className='flex justify-center m-2 border-b border-b-neutral-900'>
            <input 
                type='input' 
                className='w-full m-4 p-3 rounded-2xl bg-neutral-500/50 focus:outline-none text-white' 
                placeholder='Search'
                onChange={(e)=>onSearch(e.target.value)}
                />
        </div>
        <div>
            <div className='flex flex-row gap-3 mx-5 px-5 pb-2 text-xl text-white border-b border-b-neutral-900'>
                <button className='bg-neutral-500/50 rounded-2xl px-3 mx-1'>People</button>
                <h1 className='bg-neutral-500/50 rounded-2xl px-3 mx-1'>News</h1>
            </div>
            <div>
            <ul className="flex flex-col space-y-2 p-2">
                {displayUsers.map((user, index) => (
                <li
                    key={index}
                    className="flex bg-neutral-900 p-2 rounded-md hover:bg-neutral-700 transition-all cursor-pointer items-center justify-between"
                    onClick={()=>handleProfile(user)}
                    >
                    <div className='flex m-2 '>
                        <img src={(user?.photoURL==null)?nodp:user?.photoURL} className='h-[40px] w-[40px] rounded-full'/>

                        <div className='max-w-[150px]'>
                            <h1 className='mx-3 text-white truncate font-bold' title={user.fullname}>{user.fullname}</h1>
                            <h1 className='mx-3 text-xs text-neutral-400 w-full'>{user.email}</h1>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </div>
        
    </div>)}
    {state=='profileCard' && (
         <div className='flex flex-col gap-2'>
         <div className='flex flex-col h-auto bg-neutral-800/40 hover:bg-neutral-800/20 items-start justify-start rounded-2xl'>
             <div className='flex h-[220px] w-[720px] relative'>
                 <img src={nobg} className=' m-3 p-2 w-full h-full object-cover rounded-2xl overflow-hidden'/>
                 <img src={nodp} className='absolute top-[220px] mx-24 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border-2 border-neutral-300'/>
             </div>
             <div className='pt-20 mx-10'>
                 <h1 className='text-white text-2xl font-bold '>{user.username}</h1>
                 <h1 className='text-xs text-neutral-300'>{user.email}</h1>
                 <div>
                     <span className='text-xs text-white cursor-pointer'>{user?.followers?user?.followers.length:'0'} followers</span>
                     <span className='px-2 text-xs text-white cursor-pointer'>{user?.following?user?.following.length:'0'} following</span>
                 </div>
                 <div className='flex my-5 rounded-xl relative'>
                     <h1 className='my-3 text-s text-white'>this is a sample bio!!</h1>
                 </div>
             </div>
         </div>
         <div className='flex flex-col h-auto bg-neutral-800/30 items-start justify-start rounded-2xl'>
             <div className='grid grid-cols-3 w-full m-2 '>
                 <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='posts'?'bg-neutral-800/30':''}`} onClick={()=>setProfState('posts')}>Posts</h1>
                 <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='media'?'bg-neutral-800/30':''}`} onClick={()=>setProfState('media')}>Media</h1>
                 <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='likes'?'bg-neutral-800/30':''}`} onClick={()=>setProfState('likes')}>Likes</h1>
             </div>
             <div className='flex my-2 w-full'>
                 {profState=='posts' && <ProfilePosts state={state} userData={{uid: user?.userId,
                    email: user?.email,
                    displayName: user?.username,
                    displayPic: null}}/>}
             </div>
         </div>
         
         </div>
    )}
    </>
  )
}

export default Search