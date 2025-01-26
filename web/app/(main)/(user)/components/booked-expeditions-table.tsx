"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingStatus, Role } from "@/constants";
import getErrorMessage from "@/lib/get-error-message";
import { cn } from "@/lib/utils";
import { selectUser } from "@/redux/features/auth/slice";
import { useUpdateBookingMutation } from "@/redux/features/expedition/api";
import { useAppSelector } from "@/redux/hooks";
import { TBooking, TExpedition, TUser } from "@/types";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Mock data for bookings

const statusColors = {
  ACCEPTED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELED: "bg-red-100 text-red-800",
};

export function BookedExpeditionsTable({ bookings }: { bookings: TBooking[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const { user } = useAppSelector(selectUser);
  const [updateBooking, { isLoading }] = useUpdateBookingMutation();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = bookings.filter(
      (booking) =>
        (booking?.expeditionId as TExpedition)?.name
          ?.toLowerCase()
          ?.includes(term) ||
        (booking?.userId as TUser)?.fullName?.toLowerCase()?.includes(term)
    );
    setFilteredBookings(filtered);
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const result = await updateBooking({
        bookingId,
        status: newStatus,
      }).unwrap();
      if (result?.success) {
        toast.success(result?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expeditions..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expedition</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>
                {(booking?.expeditionId as TExpedition)?.name}
              </TableCell>
              <TableCell>{(booking?.userId as TUser)?.fullName}</TableCell>
              <TableCell>{"hello"}</TableCell>
              <TableCell>{booking.seatCount}</TableCell>
              <TableCell>
                $
                {(booking.expeditionId as TExpedition).price *
                  booking?.seatCount}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[booking.status]}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.keys(statusColors)?.map((item) => (
                      <DropdownMenuItem
                        disabled={
                          item === booking?.status ||
                          isLoading ||
                          item === BookingStatus.PENDING ||
                          (booking?.status === BookingStatus.ACCEPTED &&
                            user?.role === Role.USER)
                        }
                        className={cn(
                          "capitalize cursor-pointer",
                          user?.role === Role.USER &&
                            item === BookingStatus.ACCEPTED &&
                            "hidden"
                        )}
                        key={item}
                        onClick={() => handleStatusChange(booking._id, item)}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin duration-300" />
                        ) : (
                          item?.toLowerCase()
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
