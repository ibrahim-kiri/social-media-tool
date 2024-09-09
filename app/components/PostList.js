import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, Divider, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Scheduled Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <div key={post.id}> 
            <ListItem>
              <ListItemText
                primary={post.content}
                secondary={`Scheduled at: ${new Date(post.time).toLocaleString()}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default PostList;
