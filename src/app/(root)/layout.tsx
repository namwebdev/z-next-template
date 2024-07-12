import { userServerApi } from "@/apiRequest/user/user.server.request";
import { Header } from "@/components/App/Header";
import { db } from "@/db";
import { Dna } from "lucide-react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await db.query.workspaces.findMany({})
  console.log("🚀 ~ data:", data);

  return (
    <main>
      <Header />
      <section className="mt-14">{children}</section>
    </main>
  );
}
