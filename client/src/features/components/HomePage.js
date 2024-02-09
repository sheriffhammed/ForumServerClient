import * as React from 'react';
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice"
import PostLists from '../posts/components/postLists';

export default function HomePage() {
  const userId = useSelector(selectUserId);
  //const userId = 1
  
  return (
    <>
    {/* <h1>WElcome to HomePage</h1>
    <p>User Id: {userId}</p> */}
    <PostLists userId = {userId}/>
    </>  
  
  );
}