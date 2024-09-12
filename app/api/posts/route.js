import { NextResponse } from "next/server";
import { addPost, getPosts } from "../../../lib/firebase";
import { schedulePost } from "../../../utils/scheduler";


/**
 * POST /api/posts
 * Create a new post
*/
export async function POST(req) {
    try {
        const { content, scheduledTime } = await req.json();
        const postId = await addPost({ content, scheduledTime, status: 'scheduled' });
        await schedulePost(postId, content, scheduledTime);
        return NextResponse.json({ message: 'Post scheduled successfully', id: postId });
    } catch (error) {
        console.error('Error scheduling post:', error);
        return NextResponse.json({ error: 'Error scheduling post' }, { status: 500 });
    }
}

/**
 * POST /api/posts
 * Retrieve all posts or filter posts based on query parameters
*/
export async function GET(req) {
    try {
        const posts = await getPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}
