import ClientImage from "@/components/Image/ClientImage";
import { ServerImage } from "@/components/Image/ServerImage";

export default function Home() {
  return (
    <main className="">
      <div className="w-[200px] h-20 relative">
        <ClientImage
          src="/images/no_image.webp"
          alt="Test"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative block h-full w-20">
        <ServerImage
          alt="s"
          className="object-cover"
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "auto",
          }}
          src="https://lh3.googleusercontent.com/ogw/AF2bZyhLRqXFmyRKQG8E1BRDTHOyYwws69lulfWcZ9vqS_4NoZA=s32-c-mo"
        />
      </div>
    </main>
  );
}
