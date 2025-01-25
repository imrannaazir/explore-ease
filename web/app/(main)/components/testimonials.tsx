import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Space Tourist",
    content:
      "The lunar expedition was a life-changing experience. I'll never forget the moment I first saw Earth from space.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Astrophysicist",
    content:
      "As a scientist, I was amazed by the educational value of the Space Station Experience. It's a must for anyone interested in space research.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Adventure Seeker",
    content:
      "The Mars Explorer program pushed me to my limits and showed me what humans are capable of. An unforgettable journey!",
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          What Our Explorers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
