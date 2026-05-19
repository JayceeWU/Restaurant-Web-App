import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserIcon } from "lucide-react";
import Link from "next/link";
const NAV_TEXT_STYLE = "uppercase text-sm header-lg:text-xl font-medium";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";

const AUTH_LINK_STYLE =
  "inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium uppercase transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1";

const NavDesktop = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.toUpperCase().split(" ")[0] || "User";
  const isAdmin = session?.user?.role?.toLowerCase() === "admin" || false;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <NavigationMenu className="max-w-full shrink-0" viewport={false}>
        <NavigationMenuList className="flex flex-nowrap items-center gap-x-3 header-lg:gap-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/order/menu">
                <span className={NAV_TEXT_STYLE}>Order Now</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/menu">
                <span className={NAV_TEXT_STYLE}>Menu</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/locations">
                <span className={NAV_TEXT_STYLE}>Locations</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/about">
                <span className={NAV_TEXT_STYLE}>About</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {session && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <span className="uppercase text-sm font-medium">Account</span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="right-0">
                <span className="block pb-3 px-2 text-sm font-bold">
                  Hi, {firstName}
                </span>
                <ul className="grid gap-2">
                  {isAdmin && (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin">Admin</Link>
                      </NavigationMenuLink>
                    </li>
                  )}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/order/history">Order History</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/user/settings">Settings</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <form action={signOutUser} className="w-full">
                      <Button
                        variant="ghost"
                        className="cursor-pointer w-full justify-start px-2"
                        aria-label="Sign Out"
                      >
                        Sign Out
                      </Button>
                    </form>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {!session && (
        <Link
          href="/signin"
          className={AUTH_LINK_STYLE}
          aria-label="Sign In or Join"
        >
          <UserIcon size={16} />
          <span>Sign In / Join</span>
        </Link>
      )}
    </div>
  );
};

export default NavDesktop;
