import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./SignInForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GoogleOAuth from "./GoogleOAuth";

export const metadata = {
  title: "Sign In",
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto p-2 md:my-20">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInForm />
          <GoogleOAuth />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
