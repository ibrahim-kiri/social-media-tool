import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


/**
 * Middleware function to protect API routes
 * This checks for a valid authentication token before allowing access to API routes
*/
export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (req.nextUrl.pathname.startsWith('/api')) {
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};