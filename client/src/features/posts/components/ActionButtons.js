import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';

import EditPost from './EditPost';
import { selectUserId } from "../../auth/authSlice"
import { useDeletePostMutation } from '../postsApiSlice';

export default function ActionButtons({postId}) {
  
  const userId = useSelector(selectUserId)
  const [openPost, setOpenPost] = useState(false);

  const [deletePost] = useDeletePostMutation()

  const handleClosePost = () => {
        setOpenPost(false);
        
    };

    const handleOpenPost = (postId) => {
        setOpenPost(true);
        
    };    
    //console.log('Post Id', postId)
    //console.log('User Id from Post', userId)
  //Like Post
  // const onLikePostClicked = () => {
  //   dispatch(addLike({
  //     userId,
  //     postId
  //   }))
  // }
  
    //Delete Post  
  const onDeletePostClicked = async () => {
        try {           
                
                const confirmAlert  = window.confirm("Are you sure you want to delete this post?")
                if(confirmAlert)
                  //  dispatch(deletePost({ id : postId }))
                  await deletePost(postId)
                //navigate('/')   
           
        }
        catch (err) {
        console.error('Failed to delete the post', err)
         }
    }

    
  return (
    <>
    
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete" arrow>
              <IconButton aria-label="delete" color="error" onClick={onDeletePostClicked}>
              <DeleteIcon />
              </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton aria-label="delete" color="primary" onClick={() => handleOpenPost(postId)}>
            <ModeEditIcon />
            </IconButton>
          </Tooltip>
          
        </Stack>
     {openPost && <EditPost 
        isOpen={openPost}
        handleClose={handleClosePost}
        postId = {postId}
      /> }
    </>
  );
}
