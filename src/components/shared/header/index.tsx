import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";
import { Cormorant_Garamond } from "next/font/google";
import ModeToggle from "./ModeToggle";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="flex items-center py-4 px-4">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image
            src="/image/logo.png"
            alt={APP_NAME}
            width={40}
            height={40}
            className="h-auto w-auto"
            priority={true}
          />
          <span
            className={`
              text-xl header-lg:text-3xl 
              uppercase font-bold tracking-wider whitespace-nowrap 
              ${cormorant.className}
            `}
          >
            {APP_NAME}
          </span>
        </Link>
        <NavMobile />
        <div className="hidden header-md:flex ml-auto items-center gap-3">
          <NavDesktop />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
