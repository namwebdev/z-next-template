import ClientImage from "@/components/Image/ClientImage";
import { ServerImage } from "@/components/Image/ServerImage";
import Link from "next/link";

export default function Home() {

  return (
    <main className="">
      <Link href="/photos/1">Go to photo 1</Link>

      <div className="w-[200px] h-20 relative">
        <ClientImage
          src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Test"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative block h-40 w-96">
        <ServerImage
          alt="s"
          className="object-cover"
          // width={0}
          // height={0}
          // style={{
          //   width: "100%",
          //   height: "auto",
          // }}
          fill
          src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </main>
  );
}
