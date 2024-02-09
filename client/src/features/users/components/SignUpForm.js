import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { v4 as uuidv4 } from 'uuid';
import Copyright from '../../components/Copyright';

import { useAddUserMutation } from '../userApiSlice';

//import { nanoid } from '@reduxjs/toolkit';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpForm() {

const [showSuccess, setShowSuccess] = useState(false)
const [addUser] = useAddUserMutation()

const onSubmit = async (data, e) => {
    e.preventDefault();
    const requestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      password: data.password
              
    }
    await addUser(requestBody)
    setShowSuccess(true)
    console.log("NewUser :" , requestBody)
    reset({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Required!"),
    lastName: yup.string().required("Surname Required!"),
    email: yup.string().email().required(),
    phone: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
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
            Sign up
          </Typography>
          {showSuccess ?
          <div>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>User Registration Succesful!!! </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Click <NavLink to="/login"> here</NavLink> to Login</Typography>
          </div>
          :
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.firstName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  {...register("lastName")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.lastName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  type="number"
                  {...register("phone")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.phone?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  {...register("email")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.email?.message}</Typography>
              </Grid>             
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.password?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
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