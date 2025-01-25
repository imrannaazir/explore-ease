import { Button } from "@/components/ui/button";
export function HeroSection() {
  return (
    <section className="w-full   bg-[url(/images/hero.jpg)] bg-center  ">
      <div className=" px-4 md:px-6 z-10 bg-white/30 backdrop-blur-[3px] w-full h-full lg:py-32 xl:py-48 py-12  md:py-24">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
              Explore the Final Frontier
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
              Embark on an unforgettable journey to space. Experience the thrill
              of zero gravity and witness breathtaking views of Earth.
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="default" size="lg">
              Book Your Trip
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
