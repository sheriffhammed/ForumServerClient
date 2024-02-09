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
import {useSelector, useDispatch} from 'react-redux'
// import { addPost } from '../middleware/addPost';
// import { loginDetails } from '../../auth/loginSlice';
import { useNavigate } from 'react-router-dom';

import { useAddPostMutation } from '../postsApiSlice';
import { selectUserId } from '../../auth/authSlice';

export default function AddPost({ isOpen, handleClose }) {
    
    //const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addPost] = useAddPostMutation()
    const userId = useSelector(selectUserId)
    
    const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        userId,
        body: data.body
                
      }
      //dispatch(addPost( requestBody))
      await addPost(requestBody)
      alert("Quote Added Succesfully")
      navigate('../../homepage')
      reset({
        //title: "",
        body: "",
        
      })
      handleClose()
      navigate("../homepage"); 
      //console.log("Quote Added :" , requestBody)
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
        <DialogTitle>Add Quote</DialogTitle>
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
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}