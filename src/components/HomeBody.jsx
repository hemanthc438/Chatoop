import React, { useEffect, useState } from 'react'
import logo from '../assets/chatoopLogos/logo_transparent.png'
import nodp from '../assets/noDp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { formatDate, formatDateTime, getTimewithinToday } from '../commons/commons'
const HomeBody = ({userData}) => {
    const [posts,setPosts] = useState([])
    const [isUserLiked,setIsUserLiked] = useState(false)
    useEffect(()=>{
        const q = query(collection(db,"posts"),orderBy("createdAt","desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsArray = [];
        querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
    return () => unsubscribe();
    },[])
    const handleClick = async(id,likedBy) =>{
        const postRef = doc(db, "posts", id);
        setIsUserLiked(likedBy.includes(userData.uid))
        try {
          await updateDoc(postRef, {
              "post.likedBy": isUserLiked? arrayRemove(userData.uid): arrayUnion(userData.uid)
          });
        }catch(e){
          alert(e.message)
        }
    }
    const handleTimeDate = (createdAt) =>{
        const date= new Date((createdAt)?.seconds*1000)
        const today = new Date((Timestamp.fromDate(new Date()))?.seconds*1000)
        let t=getTimewithinToday(date,today)
        if(t) return formatDateTime(date);
        else return formatDate(date);
    }
  return (
    <>
    {posts.length!=0 ?(
    <div className='flex flex-col mx-2 bg-neutral-800/40 hover:bg-neutral-800/20 rounded-2xl border-box'>
        <div className='flex justify-center m-2 border-b border-b-neutral-900'>
            <img src={logo} className='w-[60px]'/>
        </div>
        {posts.map((item, index) => (
        <div key={index} className="flex flex-row rounded-2xl m-3 border-b pb-5 border-b-neutral-900">
          <img src={item?.creatorURL?item?.creatorURL:nodp} className="h-[40px] w-[40px] rounded-full"/>
          <div className="flex flex-col">
            <div className='flex'>
                <h1 className='pl-2 text-white font-bold'>{item?.fullname}</h1>
                <h1 className='pl-2 text-xs pt-1 text-neutral-500 font-light'>{handleTimeDate(item?.createdAt)}</h1>
            </div>
            <h1 className='pl-2 text-neutral-400 text-xs'>{item?.email}</h1>
            <p className='pl-2 pt-2 text-sm text-white whitespace-pre-wrap'>{item?.post?.postMessage}</p>
            {item?.content?.photos && <img src={item?.content?.photos} alt="photo" />}
            <div className='flex text-left pt-5'>
                <FontAwesomeIcon className={`fa-x px-2 ${item?.post?.likedBy.includes(userData.uid)?"text-red-500":""} text-neutral-400`} icon={faHeart} onClick={()=>handleClick(item.id,item.post.likedBy)}/>
                <span className={`text-xs text-neutral-400`}>{item?.post?.likedBy.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>):(<div className='flex flex-col h-full mx-2 w-full bg-neutral-800/40 hover:bg-neutral-800/20 rounded-2xl border-box justify-center'>
        <h1 className='text-2xl text-white m-3 text-center'>No posts yet!</h1>
    </div>)}
    </>
  )
}

export default HomeBody