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

      <div className="bg-gray-900 mt-4">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download the LMS app</h3>
            <p>Access all your courses on the go. Never miss a class again!</p>
            <div className="flex justify-center my-10">
              <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Google Playstore"
                  className="w-7 md:w-8"
                  width={60}
                  height={60}
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </div>
              <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  alt="Apple Store"
                  className="w-7 md:w-8"
                  width={60}
                  height={60}
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Apple Store </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              &copy; LMS, 2024.{" "}
            </p>
            <div className="order-1 md:order-2">
              <Link href="/about" className="px-2">
                About us
              </Link>
              <Link href="/contact" className="px-2 border-l">
                Contact us
              </Link>
              <Link href="/pivacy-policy" className="px-2 border-l">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
