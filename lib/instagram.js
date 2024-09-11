import axios from "axios";

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v12.0';

export async function publishPost(content, accessToken) {
    try {
        const response = await axios.post(`${INSTAGRAM_API_URL}/me/media`, {
            caption: content,
            access_token: accessToken,
        });
        return response.data.id;
    } catch (error) {
        console.error('Error publishing to Instagram:', error);
        throw new Error('Failed to publish post to Instagram');
    }
}

export async function getAnalytics(postId, accessToken) {
    try {
        const response = await axios.get(`${INSTAGRAM_API_URL}/${postId}/insights`, {
            params: {
                metric: 'engagement,impressions,reach',
                access_token: accessToken,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Instagram analytics:', error);
        throw new Error('Failed to fetch post analytics from Instagram');
    }
}