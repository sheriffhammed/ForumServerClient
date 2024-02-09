import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import bcrypt from "bcrypt";
import Copyright from '../components/Copyright';
        
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  //Submit Form
    const onSubmit = async (data, e) => {
        e.preventDefault();
        const email = data.email
        const password = data.password
        try{
          const userData = await login({ email, password }).unwrap()
          dispatch(setCredentials({ ...userData, email }))
          navigate('/homepage')
        } 
       catch (err){
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
             setErrMsg('No Server Response');
          } else if (err.originalStatus === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.originalStatus === 401) {
              setErrMsg('Unauthorized User');
          } else {            
              setErrMsg('Login Failed, Please check your login details and try again');
          }
          
       }
        
    }

   const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
            <Typography component="h1" variant="h5" color="red">
                {errMsg}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                {...register("email")}
                autoComplete="email"
                autoFocus
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.email?.message}</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register("password")}
                autoComplete="current-password"
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.password?.message}</Typography>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                <NavLink to="/forgotpassword"> 
                  Forgot password?
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                </Grid>
                <Grid item>
                <NavLink to="/signup"> 
                    Don't have an account? Sign Up
                </NavLink>                 
                  
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}