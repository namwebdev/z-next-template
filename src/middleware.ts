import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_SESSION_NAME, routes } from "./constants";

const protectedPaths = ["/dashboard", "/"];
const authPaths = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = cookies().get(AUTH_SESSION_NAME);

  if (protectedPaths.includes(pathname) && !token) 
    return NextResponse.redirect(new URL(routes.login, request.url));

  if (authPaths.includes(pathname) && token) 
    return NextResponse.redirect(new URL(routes.home, request.url));

  // Tiếp tục xử lý yêu cầu nếu xác thực thành công
  return NextResponse.next();
}

// Định nghĩa các đường dẫn áp dụng middleware
export const config = {
  matcher: [...protectedPaths, ...authPaths],
};
