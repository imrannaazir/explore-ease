"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const redirectUrl = pathname.includes("sign-in") ? "/sign-up" : "/sign-in";
  const buttonLabel = pathname.includes("sign-in") ? "sign up" : "sign in";
  const subTitle = `
          To keep connected stay with us by sign ${
            pathname.includes("sign-in")
              ? "in you credentials."
              : "up you personal information"
          }`;
  return (
    <main className="grid md:grid-cols-2 xl:grid-cols-3 min-h-screen *:p-6   ">
      <section className=" bg-primary/10 backdrop-blur-md   flex-col text-center  gap-6 relative hidden md:flex items-center justify-center">
        <div className="absolute inset-0 blur-3xl ">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-50 animate-pulse"></div>
        </div>
        <h2 className="text-5xl font-semibold">Welcome back!</h2>
        <p className="font-medium">{subTitle}</p>
        <Button
          onClick={() => router.push(redirectUrl)}
          variant={"outline"}
          size={"lg"}
          className="bg-transparent z-10 rounded-full"
        >
          {buttonLabel}
        </Button>
      </section>
      <section className="xl:col-span-2 flex items-center justify-center">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
