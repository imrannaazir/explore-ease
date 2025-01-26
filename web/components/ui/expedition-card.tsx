import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TExpedition } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ExpeditionCard({ expedition }: { expedition: TExpedition }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          width={200}
          height={100}
          src={
            "https://www.eyos-expeditions.com/wp-content/uploads/2023/07/EYOS_Greenland_SteinRetzlaff_2022_batch2-103.jpg"
          }
          alt={expedition.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{expedition.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{expedition.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPinIcon className="w-3 h-3" />
            {expedition.destination}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {format(expedition.departureDate, "MMM d, yyyy")}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <UsersIcon className="w-3 h-3" />
            {expedition.availableSeats} seats left
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-gray-50">
        <div className="text-lg font-bold">
          ${expedition.price.toLocaleString()}
        </div>
        <Link href={`/expeditions/${expedition._id}`}>
          <Button>View details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
