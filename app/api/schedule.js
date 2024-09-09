export async function POST(req) {
    try {
      const { postContent } = await req.json();  // Parsing JSON body
  
      if (!postContent) {
        return new Response(
          JSON.stringify({ message: 'Post content is required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Logic to save the postContent (e.g., database save logic)
      console.log('Post Scheduled:', postContent);
  
      return new Response(
        JSON.stringify({ message: 'Post scheduled successfully', postContent }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'An error occurred', error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  