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
import { ErrorSharp } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux'

import { selectLastName, 
          selectFirstName,
          selectPhone,
          selectEmail} from "../../auth/authSlice"
import { useUpdateUserMutation } from '../userApiSlice';
import { useLazyLogoutQuery } from '../../auth/authApiSlice';


export default function EditProfile({ isOpen, handleClose, userId }) {
  const navigate = useNavigate()
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)
  const phone = useSelector(selectPhone)
  const email = useSelector(selectEmail)
  const [updateUser]  = useUpdateUserMutation()
  const [trigger, {logout , isSuccess}] = useLazyLogoutQuery()

  const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        id : userId,
        ...data
      }
      await updateUser(requestBody)
      alert("Record Updated Succesfully, You have to Re-Login to see changes")
      trigger()
      navigate("../../login"); 

      reset({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      })
   
    }

      const schema = yup.object().shape({
        firstName: yup.string().required("First Name Required!"),
        lastName: yup.string().required("lastName Required!"),
        email: yup.string().email().required(),
        phone: yup.number().positive().integer().required(),
        
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
        <DialogTitle>Edit My Profile</DialogTitle>
        <DialogContent style={{width:"500px",margin:"auto"}}>
        <DialogContentText>
        </DialogContentText>
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={firstName}
                  {...register("firstName")}
                />
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.firstName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="lastName"
                  {...register("lastName")}
                  defaultValue={lastName}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {ErrorSharp.lastName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  type="number"
                  {...register("phone")}
                  defaultValue={phone}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.phone?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  defaultValue={email}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.email?.message}</Typography>
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