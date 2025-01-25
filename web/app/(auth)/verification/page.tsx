"use client";
import { Button } from "@/components/ui/button";
import getErrorMessage from "@/lib/get-error-message";
import { useVerifyAccountMutation } from "@/redux/features/auth/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MdError, MdVerified } from "react-icons/md";
import { toast } from "sonner";

type VerificationState = "loading" | "verified" | "error";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const [verificationState, setVerificationState] =
    useState<VerificationState>("loading");
  const [verifyAccount] = useVerifyAccountMutation();

  useEffect(() => {
    const handleVerifyAccount = async () => {
      if (!token) {
        setVerificationState("error");
        return;
      }

      try {
        const response = await verifyAccount(token).unwrap();
        if (response.success) {
          setVerificationState("verified");
        } else {
          setVerificationState("error");
        }
      } catch (error) {
        setVerificationState("error");
        toast.error(getErrorMessage(error));
      }
    };

    handleVerifyAccount();
  }, [token, verifyAccount]);

  return (
    <section className="mx-auto flex min-h-screen flex-col items-center justify-center gap-3 p-5 lg:w-[50%]">
      {verificationState === "loading" && <LoadingState />}
      {verificationState === "verified" && <VerifiedState />}
      {verificationState === "error" && <ErrorState />}
    </section>
  );
};

const LoadingState = () => (
  <>
    <AiOutlineLoading className="size-10 animate-spin text-primary" />
    <span>Verifying Your Account</span>
  </>
);

const VerifiedState = () => (
  <>
    <MdVerified className="size-[100px] rounded-full border bg-muted-foreground p-4" />
    <h3 className="text-xl font-medium">Your Account Now Verified!!</h3>
    <span className="text-sm text-accent-foreground">
      Now you can fully access our platform
    </span>
    <Link href="/sing-in">
      <Button variant="outline" size="sm" className="px-6">
        Go To Login
      </Button>
    </Link>
  </>
);

const ErrorState = () => (
  <>
    <MdError className="size-[70px] rounded-full border bg-red-600 p-2 text-white lg:size-[100px] lg:p-4" />
    <h3 className="text-xl font-medium">Cannot Verify Your Account</h3>
  </>
);

export default VerifyPage;
