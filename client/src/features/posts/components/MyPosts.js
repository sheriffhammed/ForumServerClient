import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//import PostAuthor from './PostAuthor';
import ActionButtons from './ActionButtons';

import PostLinks from './PostLinks';
import Copyright from '../../components/Copyright';
import TimeAgo from './TimeAgo';

import { useGetPostsQuery } from "../postsApiSlice"

const Root = styled('div')(({ theme }) => ({
  width: '50%',
  justifyContent: "center",
  alignItems: "center",
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function MyPosts() {
  const { userId } = useParams()
  
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetPostsQuery()

  let contents;
  if (isLoading) {
    contents = <CircularProgress />
  } 
  else if (isSuccess) {
    const myPosts = posts.data.filter(post => post.userId === Number(userId))
    const orderedPosts = myPosts.slice().sort((a, b) => b.date.localeCompare(a.date))
    contents = orderedPosts.map(post => {
          return(
            <>
              
              <Root>
                  <Divider textAlign='left'>
                  <br />
                  <b> <Chip label={post.User.firstName + " " + post.User.lastName} /></b>
                      {/* <Chip label={<PostAuthor userId={post.userId} />} /> */}
                  </Divider>
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TimeAgo timestamp={post.date} />
                  <br/>
                  {post.body}
                  {<ActionButtons 
                        postId = {post.id}
                        userId = {post.userId}
                    />}
                  {/* {userId === post.userId ?
                    <ActionButtons 
                        postId = {post.id}
                        userId = {post.userId}
                    />
                  : 
                    <LikeButton />
                  } */}
                  
                  
              </Root>
              </>
          )
        } )
    }
    else if (isError) {
      contents = <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> {error} </Typography>;
  }

  return (
    <>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <PostLinks userId = {userId}/>
            
            {contents}
            <br/><br/>
            <Copyright />
    </Box>
   
    </>
  );
}
