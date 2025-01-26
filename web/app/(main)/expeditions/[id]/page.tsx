"use client";
import Container from "@/components/ui/container";
import { useGetSingleExpeditionQuery } from "@/redux/features/expedition/api";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { BookingForm } from "../../components/booking-form";
import { BookingFormSkeleton } from "../../components/booking-form-skeleton";
import { ExpeditionDetails } from "../../components/expedition-details";
import { ExpeditionDetailsSkeleton } from "../../components/expedition-details-skeleton";

export default function ExpeditionDetailsPage() {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetSingleExpeditionQuery(id, {
    skip: !id,
  });
  const expedition = data?.data;

  let content: ReactNode;
  if (isFetching) {
    content = (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ExpeditionDetailsSkeleton />
        </div>
        <div>
          <BookingFormSkeleton />
        </div>
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
  } else {
    content = (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ExpeditionDetails expedition={expedition! || {}} />
        </div>
        <div>
          <BookingForm expedition={expedition! || {}} />
        </div>
      </div>
    );
  }

  return <Container className="my-20">{content}</Container>;
}
