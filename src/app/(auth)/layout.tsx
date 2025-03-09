import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex items-center justify-center w-full h-screen">
            <div className="flex-1 w-full h-full bg-primary md:flex items-center justify-center p-6 hidden">
                <div>
                    <h1 className={cn("text-white tracking-wider")}>Cloud Clove</h1>

                </div>
            </div>

            <div className="flex-1 w-full h-full flex items-center justify-center p-4">
                {children}
            </div>
        </main>
    );
};

export default Layout;
