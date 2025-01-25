import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";

const expeditions = [
  {
    id: 1,
    title: "Lunar Odyssey",
    description: "A 7-day journey to the Moon and back",
    price: "$250,000",
    image:
      "https://www.eyos-expeditions.com/wp-content/uploads/2023/07/EYOS_Greenland_SteinRetzlaff_2022_batch2-103.jpg",
  },
  {
    id: 2,
    title: "Mars Explorer",
    description: "Be among the first humans to set foot on the Red Planet",
    price: "$500,000",
    image:
      "https://www.eyos-expeditions.com/wp-content/uploads/2023/07/EYOS_Greenland_SteinRetzlaff_2022_batch2-103.jpg",
  },
  {
    id: 3,
    title: "Space Station Experience",
    description: "Live and work in Earth's orbit for 10 days",
    price: "$100,000",
    image:
      "https://www.eyos-expeditions.com/wp-content/uploads/2023/07/EYOS_Greenland_SteinRetzlaff_2022_batch2-103.jpg",
  },
];

export function FeaturedExpeditions() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <Container>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Featured Expeditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expeditions.map((expedition) => (
            <Card key={expedition.id}>
              <CardHeader>
                <CardTitle>{expedition.title}</CardTitle>
                <CardDescription>{expedition.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={expedition.image || "/placeholder.svg"}
                  alt={expedition.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-2xl font-bold">{expedition.price}</span>
                <Button>Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
