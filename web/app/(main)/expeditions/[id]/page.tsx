import Container from "@/components/ui/container";
import { BookingForm } from "../../components/booking-form";
import { ExpeditionDetails } from "../../components/expedition-details";

// In a real application, you would fetch this data from an API
const expeditionData = {
  id: "1",
  name: "Mars Explorer",
  description:
    "Embark on an unforgettable journey to the Red Planet. Experience the thrill of being among the first humans to set foot on Mars, explore its rugged terrain, and conduct groundbreaking scientific experiments.",
  destination: "Mars",
  departureDate: new Date("2025-07-01"),
  returnDate: new Date("2025-12-31"),
  price: 500000,
  totalSeats: 6,
  availableSeats: 3,
  image: "/placeholder.svg?height=400&width=800",
  highlights: [
    "Be among the first humans on Mars",
    "Conduct cutting-edge scientific research",
    "Experience Martian gravity",
    "Spectacular views of Martian landscapes",
    "State-of-the-art space habitat",
  ],
};

export default function ExpeditionDetailsPage() {
  return (
    <Container className=" py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ExpeditionDetails expedition={expeditionData} />
        </div>
        <div>
          <BookingForm expedition={expeditionData} />
        </div>
      </div>
    </Container>
  );
}
