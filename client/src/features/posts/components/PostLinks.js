import {useState} from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import GrainIcon from "@mui/icons-material/Grain";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { NavLink } from "react-router-dom";
import AddPost from "./AddPost";


function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function PostLinks({postUserId}) {
    const [openPost, setOpenPost] = useState(false);

    const handleClosePost = () => {
        setOpenPost(false);
        
    };

    const handleOpenPost = (postId) => {
        setOpenPost(true);
        
    };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
      <NavLink to='../homepage'>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
        
          <DensitySmallIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          All Quotes
        </Typography>
        </NavLink>
        <NavLink to={`/mypost/${postUserId}`}>
        
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
        
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Quotes
        </Typography>
        </NavLink>
        <NavLink to={''} onClick={() => handleOpenPost()}>
        
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
        
          <AddBoxIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Add Quote
        </Typography>
        </NavLink>
      </Breadcrumbs>
      {openPost && <AddPost 
        isOpen={openPost}
        handleClose={handleClosePost}
        
      /> }
    </div>
  );
}

