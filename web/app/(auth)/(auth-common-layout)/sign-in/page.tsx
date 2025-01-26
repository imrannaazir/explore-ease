"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getErrorMessage from "@/lib/get-error-message";
import { useSignInMutation } from "@/redux/features/auth/api";
import { signInValidator } from "@/schemas";
import type { TSignInProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultCredentials = {
  user: { email: "user@gmail.com", password: "password123" },
  admin: { email: "admin@gmail.com", password: "password123" },
};

const SignInPage = () => {
  const [open, setOpen] = useState(false);
  const [signIn, { isLoading }] = useSignInMutation();
  const router = useRouter();
  const [userType, setUserType] = useState<"user" | "admin">("user");

  const form = useForm<TSignInProps>({
    resolver: zodResolver(signInValidator),
    defaultValues: defaultCredentials[userType],
  });

  useEffect(() => {
    form.reset(defaultCredentials[userType]);
  }, [userType, form]);

  async function onSubmit(values: TSignInProps) {
    try {
      const result = await signIn(values).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        router.push(`/`);
        form.reset();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8 w-full ">
      <h2 className="text-4xl font-semibold text-primary text-center ">
        Sign in account
      </h2>
      <Select
        onValueChange={(value: "user" | "admin") => setUserType(value)}
        defaultValue={userType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select user type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email address."
                    {...field}
                    start={
                      <Button
                        size={"icon"}
                        disabled
                        variant={"outline"}
                        className="bg-background"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={open ? "text" : "password"}
                    placeholder="Enter your password."
                    {...field}
                    start={
                      <Button
                        size={"icon"}
                        disabled
                        variant={"outline"}
                        className="bg-background"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                    }
                    end={
                      <Button
                        type="button"
                        size={"icon"}
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full h-12" type="submit">
            {isLoading ? (
              <Loader className="animate-spin duration-300" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
