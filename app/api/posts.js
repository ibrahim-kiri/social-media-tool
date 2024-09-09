export async function GET(req) {
    try {
      const posts = [
        { id: 1, content: 'First scheduled post', time: '2024-09-09T10:00' },
        { id: 2, content: 'Second scheduled post', time: '2024-09-10T15:00' },
      ];
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'An error occurred', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  