import React, { useEffect, useState } from 'react'
import nodp from "../assets/noDp.png"
import nobg from "../assets/noBgg.png"
import { useNavigate } from 'react-router-dom';
import ProfilePosts from './profilePosts';
import { doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

const Profile = ({userData,statePrev}) => {
    const [state,setState] = useState("posts")
    const [user,setUser] = useState(null)
    useEffect(()=>{
        getUser()
    },[])
    const navigate = useNavigate()
    userData.displayName=!!(userData?.displayName)?userData?.displayName:userData?.email.split("@")[0]
    userData.displayPic=(userData?.displayPic==null)?nodp:userData?.displayPic
    const getUser = async() =>{
        try {
            const userRef = doc(db, 'users', userData.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
                setUser(userSnap.data());
            } else {
                console.log("No such user!");
            }
        } catch(e) {
            console.error("Error fetching user:", e);
            alert(e.message);
        }
    }
  return (
    <div className='flex flex-col gap-2'>
    <div className='flex flex-col h-auto bg-neutral-800/40 hover:bg-neutral-800/20 items-start justify-start rounded-2xl'>
        <div className='flex h-[220px] w-[720px] relative'>
            <img src={nobg} className=' m-3 p-2 w-full h-full object-cover rounded-2xl overflow-hidden'/>
            <img src={nodp} className='absolute top-[220px] mx-24 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border-2 border-neutral-300'/>
        </div>
        <div className='pt-20 mx-10'>
            <h1 className='text-white text-2xl font-bold '>{userData.displayName}</h1>
            <h1 className='text-xs text-neutral-300'>{userData.email}</h1>
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
            <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='posts'?'bg-neutral-800/30':''}`} onClick={()=>setState('posts')}>Posts</h1>
            <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='media'?'bg-neutral-800/30':''}`} onClick={()=>setState('media')}>Media</h1>
            <h1 className={`text-white col-span-1 text-center rounded-2xl cursor-pointer ${state=='likes'?'bg-neutral-800/30':''}`} onClick={()=>setState('likes')}>Likes</h1>
        </div>
        <div className='flex my-2 w-full'>
            {state=='posts' && <ProfilePosts userData={userData}/>}
        </div>
    </div>
    
    </div>
  )
}

export default Profile