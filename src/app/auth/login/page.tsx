"use client";

import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { submitLogin } from "./action";

export default function LoginPage() {
  const router = useRouter();
  const {execute, isPending, error} = useServerAction(submitLogin);

  const login = async () => {
    const [res, err] = await execute({phone: "123", password: "123"});
    console.log(res,err);
  };

  return <button onClick={login}>Login</button>;
}
