import { Header } from "@/components/App/Header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchMe = async () => {
    const res = await fetch("http://localhost:5000/v1/user/me");
    const data = await res.json();
    console.log("🚀 ~ fetchMe ~ data:", data);
  };
  await fetchMe();

  return (
    <main>
      <Header />
      <section className="mt-14">{children}</section>
    </main>
  );
}
