import * as React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';

import { useUpdatePostMutation, useGetPostsQuery } from '../postsApiSlice';

export default function EditPost({ isOpen, handleClose, postId }) {
    //const retreivePostById = useSelector(state => selectPostById(state, postId))
    const { data: posts } = useGetPostsQuery()
    const [updatePost] = useUpdatePostMutation()
    const retreivePostById = posts.data.find(post => post.id === Number(postId))
    
    const navigate = useNavigate()
         
    // const currentUser = users.users.filter(user => user.id === userId)
     
    const { body} = retreivePostById
    
    //   console.log('Current User Id', userId)
    //   console.log('Current User Details', currentUser[0])

    const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        ...retreivePostById,
        ...data
      }
      //dispatch(editPost( requestBody))
      await updatePost(requestBody)
      alert("Quote Updated Succesfully")
      navigate('../../homepage')
      reset({
        //title: "",
        body: "",
        
      })
      handleClose()
      navigate("../homepage"); 
      //console.log("Form Update Record :" , requestBody)
    }

      const schema = yup.object().shape({
        //title: yup.string().required("Title Required!"),
        body: yup.string().required("Quote Required!"),
        
      });
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
  return (
    <div>
      
      <Dialog  open={ isOpen } onClose={handleClose} >
        <DialogTitle>Edit Quote</DialogTitle>
        <DialogContent style={{width:"500px",margin:"auto"}}>
        <DialogContentText>
        </DialogContentText>
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  defaultValue={title}
                  {...register("title")}
                />
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.title?.message}</Typography>
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="body"
                  label="Quote"
                  multiline
                  rows={4}
                  {...register("body")}
                  defaultValue={body}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.body?.message}</Typography>
              </Grid>
              
            </Grid>
        </Box>

        </DialogContent>
        <DialogActions>
        <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleClose()} 
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}