import { Badge } from "@/components/ui/badge";
import { TExpedition } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

export function ExpeditionDetails({ expedition }: { expedition: TExpedition }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{expedition.name}</h1>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={
            "https://www.eyos-expeditions.com/wp-content/uploads/2023/07/EYOS_Greenland_SteinRetzlaff_2022_batch2-103.jpg"
          }
          alt={expedition.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" />
          {expedition.destination}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          {format(expedition.departureDate, "MMM d, yyyy")} -{" "}
          {format(expedition.returnDate, "MMM d, yyyy")}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <UsersIcon className="w-4 h-4" />
          {expedition.availableSeats} seats available
        </Badge>
      </div>
      <p className="text-gray-600">{expedition.description}</p>
    </div>
  );
}
