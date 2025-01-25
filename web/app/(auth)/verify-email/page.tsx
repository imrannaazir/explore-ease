"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getErrorMessage from "@/lib/get-error-message";
import { useResentVerificationEmailMutation } from "@/redux/features/auth/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MdMarkEmailUnread } from "react-icons/md";

import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("e");
  const router = useRouter();

  if (!email) {
    router.push("/");
  }

  console.log(email);

  const [resendVerificationEmail, { isLoading }] =
    useResentVerificationEmailMutation();

  const handleResentVerificationLink = async () => {
    try {
      const response = await resendVerificationEmail({ email }).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <MdMarkEmailUnread className="h-12 w-12 text-primary" />
          <p className="text-center text-gray-600">
            Weve sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            disabled={isLoading}
            onClick={handleResentVerificationLink}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin duration-300" />
            ) : (
              "Resend Verification Email"
            )}
          </Button>
          <Link
            href="/"
            className="text-center text-sm text-gray-600 hover:underline"
          >
            Return to Home Page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
