import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b dark:bg-neutral-950 h-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex-shrink-0">
                {/* <Image
                    className="h-10 w-10"
                    src="/brand/logo.png"
                    alt="Growsoc logo"
                    width={150}
                    height={150}
                  /> */}
              </Link>
              <div className="block">
                <div className="flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="text-neutral-950 text-lg font-semibold dark:text-neutral-50"
                  >
                    LMS
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          About
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/course" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Courses
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm font-medium"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" className="text-sm font-medium" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>

      {children}
    </>
  );
}
