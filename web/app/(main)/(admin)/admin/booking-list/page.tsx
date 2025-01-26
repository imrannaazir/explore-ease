"use client";
import { BookedExpeditionsTable } from "@/app/(main)/(user)/components/booked-expeditions-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBookedExpeditionsQuery } from "@/redux/features/expedition/api";
import { ReactNode } from "react";

export default function BookedExpeditionsListPage() {
  const { data, isFetching, isError } = useGetAllBookedExpeditionsQuery("");
  const bookings = data?.data;
  let content: ReactNode;
  if (isFetching) {
    content = (
      <div className="grid gap-6">
        {Array.from({ length: 6 })?.map((_item, i) => (
          <Skeleton className="w-full h-6" key={i} />
        ))}
      </div>
    );
  } else if (!isFetching && isError) {
    content = (
      <div className="w-full">
        <p className="text-sm text-destructive text-center">
          Something went wrong.
        </p>
      </div>
    );
  } else if (!isFetching && !isError && bookings?.length === 0) {
    content = (
      <div className="w-full">
        <p className="text-sm  text-center">No bookings founded.</p>
      </div>
    );
  } else {
    content = <BookedExpeditionsTable bookings={bookings || []} />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Booked Expeditions</h1>
      {content}
    </div>
  );
}
