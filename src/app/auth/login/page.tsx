"use client"

import { AUTH_SESSION_NAME, routes } from "@/constants";
import env from "@/env";
import { setCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  const login = async () => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: "123",
        password: "123"
      }),
    });
    const data = await res.json();
    setCookie(AUTH_SESSION_NAME, data.token)
    router.push(routes.home)
  };

  return <button onClick={login}>Login</button>;
}
