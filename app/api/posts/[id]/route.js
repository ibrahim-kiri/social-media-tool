import { NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "../../../../lib/firebase";

/**
 * GET /api/posts[id]
 * Retrieve a specific post by ID
*/
export async function GET(req, { params }) {
    try {
        const post = await getPostById(params.id);
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
    }
}

/**
 * PUT /api/posts/[id]
 * Update a specific post by ID
*/
export async function PUT(req, { params }) {
    try {
        const updates = await req.json();
        await updatePost(params.id, updates);
        return NextResponse.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}

/**
 * DELETE /api/posts/[id]
 * Delete a specific post by ID
*/
export async function DELETE(req, { params }) {
    try {
        await deletePost(params.id);
        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}