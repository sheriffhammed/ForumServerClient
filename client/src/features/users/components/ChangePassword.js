import {useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
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

import {useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../userApiSlice';
import { useLazyLogoutQuery } from '../../auth/authApiSlice';

export default function ChangePassword({ isOpen, handleClose, userId }) {
    const navigate = useNavigate()
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [updateUser] = useUpdateUserMutation()
    const [trigger] = useLazyLogoutQuery()

    const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        id : userId,
        password: data.newPassword
      }
      await updateUser(requestBody)
      alert("Password Changed Succesfully, You have to Re-Login")
      trigger()
      navigate("../../login"); 
      //setPasswordErrorMessage("")
      //console.log("Form Update Record :" , requestBody)
      reset({
        newPassword: "",
        //currentPassword: "",
        confirmPassword: "",
      })
    }

      const schema = yup.object().shape({
       // currentPassword: yup.string().min(4).max(20).required(),
        newPassword: yup.string().min(4).max(20).required(),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords Don't Match")
        .required(),
        
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
              <DialogTitle>Edit Password</DialogTitle>
              <DialogContent style={{width:"500px",margin:"auto"}}>
              <DialogContentText>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {passwordErrorMessage}</Typography>
              </DialogContentText>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        id="currentPassword"
                        {...register('currentPassword')}
                      />
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.currentPassword?.message}</Typography>
                    </Grid> */}
                  <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        {...register('newPassword')}
                      />
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.newPassword?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="confirm Password"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                      />
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.confirmPassword?.message}</Typography>
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