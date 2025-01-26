"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getErrorMessage from "@/lib/get-error-message";
import { selectUser } from "@/redux/features/auth/slice";
import { useBookExpeditionMutation } from "@/redux/features/expedition/api";
import { useAppSelector } from "@/redux/hooks";
import { TExpedition } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { BookingFormSkeleton } from "./booking-form-skeleton";

export function BookingForm({ expedition }: { expedition: TExpedition }) {
  const [bookExpedition, { isLoading }] = useBookExpeditionMutation();
  const { user } = useAppSelector(selectUser);
  const bookingSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    seats: z.coerce
      .number()
      .min(1, {
        message: "Please select at least 1 seat.",
      })
      .max(expedition?.availableSeats, {
        message: `Limited seat exceeded`,
      }),
  });

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.email || "",
      seats: 1,
    },
  });

  useEffect(() => {
    form.setValue("email", user?.email || "");
    form.setValue("name", user?.fullName || "");
  }, [form, user?.email, user?.fullName]);
  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    try {
      const result = await bookExpedition({
        seats: values.seats,
        expeditionId: expedition?._id,
      }).unwrap();
      if (result?.success) {
        toast.success(result?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  if (!user?.id) {
    return (
      <div>
        <BookingFormSkeleton />
        <Link href={"/sign-in"}>
          <Button className="w-full mt-4">Login to book</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book Your Expedition</h2>
      <p className="text-lg font-semibold mb-4">
        Price: ${expedition.price.toLocaleString()} per seat
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter your full name"
                    {...field}
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Seats</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter seat count"
                  {...field}
                />
                <FormDescription>
                  {expedition?.availableSeats} Seats available
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || expedition?.availableSeats < 1}
          >
            {isLoading
              ? "Processing..."
              : expedition?.availableSeats < 1
              ? "No available seats"
              : "Book Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
