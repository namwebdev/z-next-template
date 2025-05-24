import { Sidebar } from "@/components/App/Sidebar";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] gap-1">
            <Sidebar />
            <section>{children}</section>
        </main>
    );
}
