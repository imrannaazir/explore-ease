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
import { signUpValidator } from "@/schemas";
import { TSignUpProps } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const form = useForm<TSignUpProps>({
    resolver: zodResolver(signUpValidator),
  });

  function onSubmit(values: TSignUpProps) {
    console.log(values);
  }
  return (
    <div className="mx-auto max-w-xl space-y-8 w-full ">
      <h2 className="text-4xl font-semibold text-primary text-center ">
        Sign up account
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your full name."
                    {...field}
                    start={
                      <Button
                        size={"icon"}
                        disabled
                        variant={"outline"}
                        className="bg-background"
                      >
                        <User className="w-4 h-4" />
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
                        type="reset"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={confirmOpen ? "text" : "password"}
                    placeholder="Confirm your password."
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
                        type="reset"
                        size={"icon"}
                        onClick={() => setConfirmOpen(!confirmOpen)}
                      >
                        {confirmOpen ? (
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

export default SignUpPage;
