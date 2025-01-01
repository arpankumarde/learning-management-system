import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-4xl font-bold tracking-tight">Page not found</h2>

      <p className="text-muted-foreground text-center">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Button asChild className="mt-4">
        <Link href="/">Go Back Home</Link>
      </Button>
    </main>
  );
};

export default Page;
