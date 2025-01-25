import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Begin Your Space Adventure?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Join us on a journey beyond Earth and experience the wonders of
              the cosmos firsthand.
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="default" size="lg">
              Book Your Expedition
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
