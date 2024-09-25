"use client";

import { useRouter } from "next/navigation";
import { authApi } from "@/apiRequest/auth.request";
import { AUTH_SESSION_NAME, routes } from "@/constants";
import { setCookie } from "@/lib/cookie";

export default function LoginPage() {
  const router = useRouter();

  const login = async () => {
    const {
      data: { token },
    } = await authApi.login("123", "123");
    setCookie(AUTH_SESSION_NAME, token);
    router.push(routes.home);
  };

  return <button onClick={login}>Login</button>;
}
