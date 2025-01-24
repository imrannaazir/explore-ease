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
import { signInValidator } from "@/schemas";
import { TSignInProps } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TSignInProps>({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: "admin@gmail.com",
      password: "password123",
    },
  });

  function onSubmit(values: TSignInProps) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="mx-auto max-w-xl space-y-8 w-full ">
      <h2 className="text-4xl font-semibold text-primary text-center ">
        Sign in account
      </h2>
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
                      <Button size={"icon"} onClick={() => setOpen(!open)}>
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
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
