// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api from "../endpoints.json";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('name')?.value;
console.log({token})
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const rawResponse = await fetch(api.authMiddleware, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });

  const result = await rawResponse.json();

  if (!result.isValid) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
