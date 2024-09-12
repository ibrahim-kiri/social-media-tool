import { NextResponse } from "next/server";
import { getAnalytics } from "../../../lib/instagram";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    try {
        // Fetch analytics from instagram
        const analytics = await getAnalytics(postId);
        return NextResponse.json(analytics);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Error fetching analytics' }, { status: 500 });
    }
}