"use client";

import { TPopularDestination } from "@/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function PopularDestinationsChart({
  data,
}: {
  data: TPopularDestination[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="_id"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="bookings" fill="#ff385d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
