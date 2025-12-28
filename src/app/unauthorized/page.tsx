import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
export const metadata: Metadata = {
  title: "Unauthorized Access",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/image/logo.png"
        width={70}
        height={70}
        alt={`${APP_NAME} logo`}
        className="h-auto w-auto"
        priority={true}
      />
      <div className="p-6 w-6/7 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p>You do not have permission to access this page.</p>
        <Button variant="outline" className="mt-4 ml-2" asChild>
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
}
