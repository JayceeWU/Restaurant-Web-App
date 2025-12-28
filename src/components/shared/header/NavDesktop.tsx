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

const NavDesktop = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.toUpperCase().split(" ")[0] || "User";

  return (
    <div className="hidden header-md:flex ml-auto items-center">
      <NavigationMenu className="max-w-full ml-6" viewport={false}>
        <NavigationMenuList className="flex flex-wrap items-center gap-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">
                <span className={NAV_TEXT_STYLE}>Home</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/order">
                <span className={NAV_TEXT_STYLE}>Order</span>
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
          {session ? (
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
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/admin">Admin</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/user/orders">Order History</Link>
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
          ) : (
            <NavigationMenuItem className="border rounded-md">
              <NavigationMenuLink asChild>
                <Link href="/signin">
                  <div className="flex items-center gap-2">
                    <UserIcon size={16} />
                    <span className="uppercase text-sm font-medium">
                      Sign In / Join
                    </span>
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavDesktop;
