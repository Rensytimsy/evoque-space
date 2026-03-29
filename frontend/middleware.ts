import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();



    if (url.pathname === '/admin/dashboard' ){
        url.pathname = '/admin/dashboard/products';
        return NextResponse.redirect(url);
    }

    if (url.pathname === '/admin' ){
        url.pathname = '/admin/dashboard/products';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/admin/dashboard/:path*'
    ],
};