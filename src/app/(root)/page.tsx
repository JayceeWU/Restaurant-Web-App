import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

const Homepage = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <Image
        src="/image/food/Mains/Sichuan Boiled Fish.png" // 备用图
        alt="Restaurant ambience"
        fill
        priority
        className="z-0 object-cover brightness-[0.7]"
      />

      <div className="absolute inset-0 z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover brightness-[0.7]"
        >
          <source src="/image/moonlit.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
        <div className="px-4">
          <h1
            className={`mb-6 text-4xl lg:text-6xl font-medium uppercase tracking-[0.15em] drop-shadow-lg`}
          >
            {APP_NAME}
          </h1>

          <Link
            href="/menu"
            className="inline-block border-4 drop-shadow-lg bg-transparent px-10 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black active:scale-95"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
