// import { db } from "@/db";
import { z } from "zod";
import { createServerAction } from "zsa";

export const submitLogin = createServerAction()
  .input(
    z.object({
      phone: z.string().min(1),
      password: z.string(),
    })
  )
  .handler(async ({ input }) => {
    console.log(input);
    // const res = await db.query.workspaces.findMany();
    // throw new Error("Unauthorized");
    return { success: true, data: 123 };
  });
