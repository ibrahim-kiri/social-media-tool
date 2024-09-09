import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/schedule", {
        content,
        time,
      });
      console.log("Post scheduled:", response.data);
    } catch (error) {
      console.error("Error scheduling post:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("/assets/pic1.jpg")', 
        backgroundSize: 'cover',
        padding: 3,
        position: 'relative', 
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better contrast
          zIndex: -1, // Place the overlay behind the form
        }}
      />
      <Typography variant="h5" gutterBottom color="black
      ">
        Schedule Post
      </Typography>
      <TextField
        fullWidth
        label="Post Content"
        variant="outlined"
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light grey with slight transparency
          borderRadius: 1,
          my: 3, 
          mx: 2, 
          input: {
            color: 'black', // Text color inside input box
          },
          fieldset: {
            borderColor: 'grey', // Grey border color for input box
          }
        }}
      />
      <TextField
        fullWidth
        label="Schedule Time"
        type="datetime-local"
        variant="outlined"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light grey with slight transparency
          borderRadius: 1,
          my: 3, 
          mx: 2, 
          input: {
            color: 'black', // Text color inside input box
          },
          fieldset: {
            borderColor: 'grey', // Grey border color for input box
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          mt: 2,
          backgroundColor: 'grey', // Grey background color for button
          '&:hover': {
            backgroundColor: 'darkgrey', // Darker grey on hover
          }
        }}
      >
        Schedule Post
      </Button>
    </Box>
  );
};

export default PostForm;
