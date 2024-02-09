import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress} from '@mui/material';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

//import PostAuthor from './PostAuthor';
import ActionButtons from './ActionButtons';

import LikeButton from '../../likes/components/LikeButton';
import PostLinks from './PostLinks';
import Copyright from '../../components/Copyright';
import TimeAgo from "./TimeAgo";

import { useGetPostsQuery , useGetAllLikedPostsQuery} from "../postsApiSlice"
// import { useGetLikesQuery,
//           useAddLikeMutation,
//           useDeleteLikeMutation
//         } from "../../likes/likesApiSlice"

const Root = styled('div')(({ theme }) => ({
  width: '50%',
  justifyContent: "center",
  alignItems: "center",
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function PostLists({userId}) {
  const [postId, setPostId] = useState('')
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  //const {data: allLikes } = useGetAllLikedPostsQuery()

  
  let contents;
  if (isLoading) {
    contents = <CircularProgress />
  } 
  else if (isSuccess) {
    //console.log('All Posts', posts)
    const orderedPosts = posts.data.slice().sort((a, b) => b.date.localeCompare(a.date))
    contents = orderedPosts.map((post, i) => {
    //const selectLikesByPostId = allLikes.find(like => like.id === post.id)
    // const isUserLiked = selectLikesByPostId.find(like => like.userId === userId)
      //contents = allPosts.map(post => {
          return(
            <>
              <Root >
                
                  <Divider textAlign='left'>
                  <br />
                     <b> <Chip label={post.User.firstName + " " + post.User.lastName} /></b>
                      {/* <Chip label={<PostAuthor userId={post.userId} />} /> */}
                  </Divider>
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TimeAgo timestamp={post.date} />
                  <br/>
                  {post.body}
                  {userId === post.userId ?
                  <>
                    <Stack direction="row" spacing={1}>
                    <Tooltip >
                      <IconButton aria-label="delete" >
                        <LikeButton 
                          postId = {post.id}
                          userId = {post.userId}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip >
                      <IconButton aria-label="delete" color="error">
                        <ActionButtons 
                          postId = {post.id}
                          userId = {post.userId}
                        />
                        </IconButton>
                    </Tooltip>
                    </Stack>
                    </>               
                    
                   
                  : 
                  
                    <LikeButton 
                      postId = {post.id}
                      userId = {post.userId}
                    />
                  }
                  
                  
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
            <PostLinks postUserId = {userId}/>
            {contents}
            <br/><br/>
            <Copyright />
    </Box>
   
    </>
  );
}
