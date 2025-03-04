"use client";
import Container from "@/components/ui/container";
import { ExpeditionCard } from "@/components/ui/expedition-card";
import { ExpeditionSkeleton } from "@/components/ui/expedition-skeleton";
import { useGetAllExpeditionQuery } from "@/redux/features/expedition/api";
import { ReactNode } from "react";

export function FeaturedExpeditions() {
  const { data, isFetching, isError } = useGetAllExpeditionQuery({
    limit: "3",
  });
  const expeditions = data?.data || [];
  let content: ReactNode;
  if (isFetching) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 })?.map((_item, i) => (
          <ExpeditionSkeleton key={i} />
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
  } else if (!isFetching && !isError && expeditions?.length === 0) {
    content = (
      <div className="w-full">
        <p className="text-sm  text-center">No expedition founded.</p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expeditions?.map((expedition) => (
          <ExpeditionCard expedition={expedition} key={expedition?._id} />
        ))}
      </div>
    );
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <Container>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Featured Expeditions
        </h2>
        {content}
      </Container>
    </section>
  );
}
