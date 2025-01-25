import { CallToAction } from "./components/call-to-action";
import { FeaturedExpeditions } from "./components/featured-expeditions";
import { HeroSection } from "./components/hero-section";
import { Testimonials } from "./components/testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <FeaturedExpeditions />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
