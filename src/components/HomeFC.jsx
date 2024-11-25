import { faCheck, faFaceSmile, faPaperclip, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import nodp from '../assets/noDp.png'
import React, { useEffect, useState } from 'react'
import { db, usersRef } from '../../firebaseConfig';

const HomeFC = ({userData}) => {
    const [ isFollowed,setIsFollowed ] = useState('Follow')
    const [users, setUsers] = useState([]);
    const [postMessage,setPostMessage] = useState("")
  useEffect(() => {
    
        getRecentUsers()
  }, []);
  const handleFollow = async(user) =>{
    setIsFollowed('Following')
    const docRef = doc(db,'users',user?.userId)
    const userRef = doc(db,'users',userData?.uid)
    try{
      await updateDoc(docRef,{
        "followers":arrayUnion(userData?.uid)
      })
      await updateDoc(userRef,{
        "following":arrayUnion(user?.userId)
      })
      setTimeout(()=>getRecentUsers(),300)
    }catch(e){
      alert(e.message)
    }
    alert(`you now follow ${user.username}`)
    
  }
  const getRecentUsers = async() => {
    try{
        const q = query(usersRef, where("userId","!=",userData?.uid))
        const querySnapshot = await getDocs(q)
        let data=[]
        querySnapshot.forEach(doc=>{
            data.push({...doc.data()})
        })

        setUsers(data.filter(item=>{
          if(item?.followers){
            return !item?.followers.includes(userData?.uid)
          }
          else{
            return item
          }
        }))
    }catch(e){
        alert(e.message)
    }
  }
  const handlePost = async() => {
    if(postMessage.trim()==="")return
    try{
      const docRef=await addDoc(collection(db,"posts"),{
        createdBy:userData?.uid,
        fullname:userData?.displayName,
        email:userData?.email,
        userId : userData?.uid,
        post:{postMessage:postMessage,likedBy:[]},
        createdAt : serverTimestamp(),
        creatorURL:userData?.displayPic
      })
      await updateDoc(docRef, {
        id: docRef.id
      });
      setPostMessage("")
    }catch(e){
      alert(e.message)
    }
  }
  return (
    <div className='flex flex-col xl:mr-3 gap-3'>
        <div className='flex flex-col min-h-[200px] bg-neutral-800/40 hover:bg-neutral-800/20  rounded-2xl'>
            <h1 className='text-white p-2 m-2 text-center border-b border-b-neutral-900'>What's Up??</h1>
            <textarea 
                placeholder='Let everyone know...' 
                className='bg-transparent p-2 h-[100px] text-white focus:outline-none whitespace-pre-wrap ' 
                onChange={(e)=>setPostMessage(e.target.value)}
                value={postMessage}
                />
            <div className='flex justify-between'>
                <div className='flex flex-row p-3 gap-3'>
                    <FontAwesomeIcon className="fa-x text-neutral-400 cursor-pointer" icon={faPaperclip}/>
                    <FontAwesomeIcon className="fa-x text-neutral-400 cursor-pointer" icon={faFaceSmile}/>
                </div>
                <h1 className='text-white hover:text-gray-400 p-2 mx-3 cursor-pointer' onClick={handlePost}>Post</h1>
            </div>
        </div>
        <div className='flex flex-col min-h-[500px] bg-neutral-800/40 hover:bg-neutral-800/20 rounded-2xl'>
        <h1 className='text-white p-2 m-2 text-center border-b border-b-neutral-900'>Suggestions</h1>
        <ul className="flex flex-col space-y-2 p-2">
        {users.slice(0,4).map((user, index) => (
          <li
            key={index}
            className="flex bg-neutral-900 p-2 rounded-md hover:bg-neutral-700 transition-all cursor-pointer items-center justify-between"
          >
            <div className='flex m-2 '>
                <img src={(user?.photoURL==null)?nodp:user?.photoURL} className='h-[40px] w-[40px] rounded-full'/>

                <div className='max-w-[150px]'>
                    <h1 className='mx-3 text-white truncate' title={user.fullname}>{user.fullname}</h1>
                    <h1 className='mx-3 text-xs text-neutral-400 w-full'>you may know</h1>
                </div>
            </div>
                <div className='flex flex-row gap-4 m-3'>
                  <span className='text-black px-3 mx-2 rounded-2xl bg-white' onClick={()=>handleFollow(user)}>Follow</span>
                    {/* <FontAwesomeIcon onClick={()=>handleFollow(user)} className=" fa-x text-neutral-400" icon={faCheck} /> */}
                    {/* <FontAwesomeIcon onClick={showRej} className=" fa-x text-neutral-400" icon={faXmark} /> */}
                </div>
          </li>
        ))}
      </ul>
        </div>
    </div>
  )
}

export default HomeFC