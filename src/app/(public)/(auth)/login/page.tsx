"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/users";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import { setCookie } from "cookies-next";

const Page = () => {
  const router = useRouter();

  type Payload = {
    email: string;
    password: string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Payload;

    try {
      const { user, error } = await loginUser(payload);

      if (error) {
        throw new Error("Failed to login user");
      }

      setCookie("lmsuser", user, {
        maxAge: 60 * 60 * 24 * 30,
      });

      switch (user?.role) {
        case "INSTRUCTOR":
          router.push("/instructor");
          break;
        case "STUDENT":
          router.push("/student");
          break;
        case "ADMIN":
          router.push("/admin");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to login user");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            LMS
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/600x400.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={400}
          height={600}
        />
      </div>
    </div>
  );
};

export default Page;
