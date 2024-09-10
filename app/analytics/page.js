"use client"

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Default values
const defaultData = {
  title: "Post Title",
  publishDate: "N/A",
  totalViews: 0,
  totalLikes: 0,
  totalComments: 0,
  totalShares: 0,
};

const defaultEngagementOverTimeData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Views',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Likes',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
    {
      label: 'Comments',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1,
    },
  ],
};

const defaultEngagementBreakdownData = {
  labels: ['Likes', 'Comments', 'Shares'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    },
  ],
};

const defaultPeakHoursData = {
  labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
  datasets: [
    {
      label: 'Engagement',
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

export default function PostAnalytics() {
  const [postData, setPostData] = useState(defaultData);
  const [engagementOverTimeData, setEngagementOverTimeData] = useState(defaultEngagementOverTimeData);
  const [engagementBreakdownData, setEngagementBreakdownData] = useState(defaultEngagementBreakdownData);
  const [peakHoursData, setPeakHoursData] = useState(defaultPeakHoursData);

  useEffect(() => {
    // Replace this with actual API call
    const fetchData = async () => {
      try {
        // Example API call
        const response = await fetch('/api/analytics');
        const data = await response.json();

        // Set state with actual data
        setPostData(data.postData || defaultData);
        setEngagementOverTimeData(data.engagementOverTimeData || defaultEngagementOverTimeData);
        setEngagementBreakdownData(data.engagementBreakdownData || defaultEngagementBreakdownData);
        setPeakHoursData(data.peakHoursData || defaultPeakHoursData);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Post Analytics
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Published on: {postData.publishDate}
        </Typography>
        
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Views</Typography>
              <Typography variant="h4">{postData.totalViews.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Likes</Typography>
              <Typography variant="h4">{postData.totalLikes.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Comments</Typography>
              <Typography variant="h4">{postData.totalComments.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Shares</Typography>
              <Typography variant="h4">{postData.totalShares.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Engagement Over Time</Typography>
              <Line data={engagementOverTimeData} options={{ responsive: true }} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Engagement Breakdown</Typography>
              <Doughnut data={engagementBreakdownData} options={{ responsive: true }} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Peak Engagement Hours</Typography>
              <Bar data={peakHoursData} options={{ responsive: true }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
