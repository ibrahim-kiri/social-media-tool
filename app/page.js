"use client"

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import PostForm from './components/PostForm';  // Component for scheduling posts
import PostList from './components/PostList';  // Component to display scheduled posts

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("/assets/pic3.jpg")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        padding: 4, 
      }}
    >
      <Container maxWidth="lg">
        <Box my={4} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Social Media Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Schedule your posts and analyze your social media performance.
          </Typography>

          <Box my={4}>
            <PostForm />
          </Box>

          <Box my={4}>
            <PostList />
          </Box>

          <Box mt={4}>
            <Button variant="contained" color="primary" href="/analytics">
              View Analytics
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

