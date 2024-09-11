class Post {
    constructor(id, content, scheduledTime, status, instagramPostId = null, analytics = null) {
        this.id = id;
        this.content = content;
        this.scheduledTime = scheduledTime;
        this.status = status;
        this.instagramPostId = instagramPostId;
        this.analytics = analytics;
    }

    static fromFirebase(doc) {
        const data = doc.data();
        return new Post(
            doc.id,
            data.content,
            data.scheduledTime,
            data.status,
            data.instagramPostId,
            data.analytics
        );
    }

    toFirebase() {
        return {
            content: this.content,
            scheduledTime: this.scheduledTime,
            status: this.status,
            instagramPostId: this.instagramPostId,
            analytics: this.analytics
        };
    }
}

export default Post;