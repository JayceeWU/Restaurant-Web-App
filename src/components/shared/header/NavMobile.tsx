import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, UserIcon } from "lucide-react";
import ModeToggle from "./ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";

const NavMobile = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.toUpperCase().split(" ")[0] || "User";
  const isAdmin = session?.user?.role?.toLowerCase() === "admin" || false;

  return (
    <div className="header-md:hidden ml-auto">
      <nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" aria-label="Open Navigation Menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex h-dvh flex-col gap-2 overflow-y-auto p-4"
            aria-describedby="Mobile navigation menu"
          >
            <SheetTitle className="text-center py-3">
              {session ? `Hi, ${firstName}` : APP_NAME}
            </SheetTitle>
            {isAdmin && (
              <SheetClose asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center"
                >
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              </SheetClose>
            )}
            <SheetClose asChild>
              <Button asChild variant="ghost" className="w-full justify-center">
                <Link href="/order/menu">Order Now</Link>
              </Button>
            </SheetClose>
            {session && (
              <SheetClose asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center"
                >
                  <Link href="/order/history">Order History</Link>
                </Button>
              </SheetClose>
            )}
            <SheetClose asChild>
              <Button asChild variant="ghost" className="w-full justify-center">
                <Link href="/menu">Menu</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="w-full justify-center">
                <Link href="/locations">Locations</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="w-full justify-center">
                <Link href="/about">About</Link>
              </Button>
            </SheetClose>
            {session && (
              <SheetClose asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center"
                >
                  <Link href="/settings">Settings</Link>
                </Button>
              </SheetClose>
            )}
            <SheetClose asChild>
              {session ? (
                <form action={signOutUser} className="w-full">
                  <Button
                    variant="ghost"
                    className="cursor-pointer w-full justify-center"
                    aria-label="Sign Out"
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon />
                      <span>Sign Out</span>
                    </div>
                  </Button>
                </form>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center"
                  aria-label="Sign In or Join"
                >
                  <Link href="/signin">
                    <div className="flex items-center gap-2">
                      <UserIcon />
                      <span>Sign In / Join</span>
                    </div>
                  </Link>
                </Button>
              )}
            </SheetClose>
            <ModeToggle />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default NavMobile;
