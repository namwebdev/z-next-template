import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (!token_hash || !type) return redirectToAuthErrorPage(redirectTo);

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });
  if (error) return redirectToAuthErrorPage(redirectTo);
  return NextResponse.redirect(redirectTo);
}

function redirectToAuthErrorPage(redirectTo: NextURL) {
  redirectTo.pathname = ROUTES.authError;
  return NextResponse.redirect(redirectTo);
}
