"use client";

import { ExpeditionCard } from "@/components/ui/expedition-card";
import { ExpeditionSkeleton } from "@/components/ui/expedition-skeleton";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllExpeditionQuery } from "@/redux/features/expedition/api";
import { ReactNode, useState } from "react";

export function ExpeditionList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data, isFetching, isError } = useGetAllExpeditionQuery({
    searchTerm: debouncedSearch,
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
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="Search expeditions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      {content}
    </div>
  );
}
