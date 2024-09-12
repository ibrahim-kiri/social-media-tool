import cron from 'node-cron';
import { getSession } from "next-auth/react";
import { getPostById, updatePost } from '../lib/firebase';
import { getAnalytics, publishPost } from '../lib/instagram';



export function schedulePost(postId, content, scheduledTime) {
    const task = cron.schedule(scheduledTime, async () => {
        try {
            const post = await getPostById(postId);
            if (post.status !== 'scheduled') {
                console.log(`Post ${postId} is no longer scheduled. Skipping.`);
                task.stop();
                return;
            }

            const session = await getSession();
            if (!session) {
                throw new Error('No active session found');
            }

            const instagramPostId = await publishPost(content, session.accessToken);
            await updatePost(postId, {
                status: 'published',
                instagramPostId,
            });

            // Fetch initial analytics
            const initialAnalytics = await getAnalytics(instagramPostId, session.accessToken);
            await updatePost(postId, { analytics: initialAnalytics });

            console.log(`Post ${postId} published successfully to Instagram.`);
            task.stop();
        } catch (error) {
            console.error(`Error publishing post ${postId}:`, error);
            await updatePost(postId, { status: 'failed' });
            task.stop();
        }
    });

    return task;
}