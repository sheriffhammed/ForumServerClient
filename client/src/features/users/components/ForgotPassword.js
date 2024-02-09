import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/Copyright';

import { useChangePasswordByEmailMutation, useGetUserByEmailQuery } from '../userApiSlice';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpForm() {
const [email, setEmail] = useState("")
const [showSuccess, setShowSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState("")
const [succesMessage, setsuccesMessage] = useState("")

const [changePasswordByEmail] = useChangePasswordByEmailMutation()
const {isError, isSuccess} = useGetUserByEmailQuery(email)

//console.log('Users with data', allUsers.users.data)
const onSubmit = async (data, e) => {  
    e.preventDefault();
    setEmail(data.email)
    try{ 
      if(isSuccess)
      {
        const requestBody = {
          email : data.email,
          password : data.newPassword
        }
        await changePasswordByEmail(requestBody)
        setsuccesMessage("Password Changed Succesful!!!")
        setShowSuccess(true)
        setErrorMessage("")
        reset({
          newPassword: "",
          email: "",
          currentPassword: "",
          confirmPassword: "",
        })   
      }else {
        setErrorMessage("Email Does not Exist !!!")
      }    
                            
    }  
    
    catch(error){
      console.log(error.message)
    }
  
}


  const schema = yup.object().shape({    
    email: yup.string().email().required(),
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red">{errorMessage} </Typography>
          {showSuccess ?
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red">{succesMessage} </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Click <NavLink to="/login"> here</NavLink> to Login</Typography>
          </div>
          :
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  {...register("email")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.email?.message}</Typography>
              </Grid>             
              
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
                  {...register("confirmPassword")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.confirmPassword?.message}</Typography>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Change Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <NavLink to="/login"> 
                  Already have an account? Sign in
              </NavLink>
              </Grid>
            </Grid>
          </Box>
          }
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}