"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleOAuth = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
  );
};

export default GoogleOAuth;
