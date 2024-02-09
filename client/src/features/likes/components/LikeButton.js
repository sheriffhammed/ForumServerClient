import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
//import { addLike } from '../../likes/middleware/addLike';
//import { loginDetails } from '../../auth/loginSlice';
//import { likesByPostID, allLikes } from '../likeSlice';
// import { fetchLikes } from '../middleware/fetchLike';
// import { disLike } from '../middleware/disLike';

import { selectUserId } from "../../auth/authSlice"
import { useGetLikesQuery,
         useAddLikeMutation,
         useDeleteLikeMutation
        } from "../likesApiSlice"

export default function LikeButton({postId}) {   
  // const dispatch = useDispatch()
  
  const userId = useSelector(selectUserId)

  const {data: selectLikesByPostId } = useGetLikesQuery(postId)
  //console.log('Likes by PostId', selectLikesByPostId?.data)
  const isUserLiked = selectLikesByPostId?.data.find(like => like.userId === userId)
  //console.log('Likes by User', isUserLiked)
  //console.log('Likes by User Ids', isUserLiked.id)
  //const isUserLiked = 5
 
  const [addLike] = useAddLikeMutation()
  const [deleteLike] = useDeleteLikeMutation()
    //Like Post
    const onLikePostClicked = async () => {
      await addLike({userId,postId})
    }


    //Dislike Post
    const onDisLikePost = async () => {
      await deleteLike(isUserLiked.id)
    }

 
 
return (
        // {likeButtonType}
        <>
        {/* <Stack direction="row" spacing={1}>
            <Tooltip title="DisLike Post" arrow>
            <IconButton aria-label="delete" color="primary" >
                                                            
              <ThumbUpAltIcon />
            </IconButton></Tooltip>  
          </Stack> */}
        {isUserLiked ?
          <Stack direction="row" spacing={1}>
            <Tooltip title="DisLike Post" arrow>
            <IconButton aria-label="delete" color="primary" onClick={() => onDisLikePost()}>
            {/* <IconButton aria-label="delete" color="primary" onClick={() => deleteLike(Number(isUserLiked?.id))}> */}
                                                            
              <ThumbUpAltIcon />
            </IconButton></Tooltip>  {selectLikesByPostId?.data.length}
          </Stack>
        :
            <Stack direction="row" spacing={1}>
              <Tooltip title="Like Post" arrow>
              <IconButton aria-label="delete" onClick={onLikePostClicked}>
                <ThumbUpAltIcon />
              </IconButton> </Tooltip> {selectLikesByPostId?.data.length}
            </Stack>
        }
        </>
       
  );
}
