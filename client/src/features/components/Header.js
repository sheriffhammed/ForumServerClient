import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {stringToColor, stringAvatar} from './avartar'
import { useSelector } from "react-redux";
import { NavLink, useNavigate , Outlet} from 'react-router-dom';

import EditProfile from '../users/components/EditProfile';
import ChangePassword from '../users/components/ChangePassword';
import { selectLastName, 
         selectFirstName,
         selectUserId } from "../auth/authSlice"
import { useLazyLogoutQuery } from '../auth/authApiSlice';


export default function Header() {
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)
  const userId = useSelector(selectUserId)
  const [trigger, {logout , isSuccess}] = useLazyLogoutQuery()
  //const {trigger} = useLogoutQuery.useLazyQuery()
  //const userId = 1
  const [auth, setAuth] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(false);
//  const [openPost, setOpenPost] = React.useState(false);
  const [openChangePassword, setopenChangePassword] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const names = firstName + " " + lastName

  const handleLogout = () => {
    const confirmAlert  = window.confirm("Are you sure you want to delete this post?")
    if(confirmAlert) { 
      trigger()
      setAuth(false)
      
      }
    
    //await logout()
  }
     
  const handleClickClose = () => {
    setOpenProfile(false);
    
  };

  const handleOpenProfile = (userId) => {
    setOpenProfile(true);
    handleClose()
  };

  const handleClosePassword = () => {
    setopenChangePassword(false);
    
  };

  const handleOpenPassword = () => {
    setopenChangePassword(true);
    handleClose()
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
     setAnchorEl(null);
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <NavLink to='/homepage'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          </NavLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Community Forum
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                {"Hello  " + firstName }
                <Stack direction="row" spacing={2}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                  <Avatar {...stringAvatar(names)} />
                </Stack>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem  onClick={() => handleOpenProfile(userId)}>Edit Profile</MenuItem>
                <MenuItem  onClick={() => handleOpenPassword()}>Change Password</MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                {/* <MenuItem onClick={() => setAuth(false)}>Logout</MenuItem> */}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {openProfile && <EditProfile 
        isOpen={openProfile}
        handleClose={handleClickClose}
        userId = {userId}
      /> }
      {openChangePassword && <ChangePassword 
        isOpen={openChangePassword}
        handleClose={handleClosePassword}
        userId = {userId}
      /> }
      {!auth &&
        navigate('../login')
      }
    </Box>
    <Outlet />         
    
  </>
  );
}