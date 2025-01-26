"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetBookingsPerMonthQuery,
  useGetPopularDestinationsQuery,
} from "@/redux/features/expedition/api";
import { ReactNode } from "react";
import { BookingsPerMonthChart } from "./bookings-per-month-chart";
import { PopularDestinationsChart } from "./popular-destinations-chart";

export function AnalyticsDashboard() {
  const { data: bookingsData, isFetching: bookingsLoading } =
    useGetBookingsPerMonthQuery("");
  const { data, isFetching: expeditionLoading } =
    useGetPopularDestinationsQuery("");
  const popularDestinations = data?.data;
  const bookingsPerMonth = bookingsData?.data;

  let content: ReactNode;

  if (bookingsLoading || expeditionLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PopularDestinationsChart data={popularDestinations!} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Bookings per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingsPerMonthChart data={bookingsPerMonth!} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return content;
}
