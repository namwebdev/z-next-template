import { userServerApi } from "@/apiRequest/user/user.server.request";
import { Header } from "@/components/App/Header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchMe = async () => {
    const { data } = await userServerApi.getMe();
    console.log("🚀 ~ fetchMe ~ res:", data);
  };
  await fetchMe();

  return (
    <main>
      <Header />
      <section className="mt-14">{children}</section>
    </main>
  );
}
