import Preloader from '@/components/sections/Preloader';
import CustomCursor from '@/components/sections/CustomCursor';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import Manifesto from '@/components/sections/Manifesto';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Accelerator from '@/components/sections/Accelerator';
import Pricing from '@/components/sections/Pricing';
import WhyChoose from '@/components/sections/WhyChoose';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="relative bg-cove-black min-h-screen">
      <Preloader />
      <CustomCursor />
      <Navigation />
      <Hero />
      <Manifesto />
      <WhyChoose />
      <Services />
      <Process />
      <Testimonials />
      <Accelerator />
      <Pricing />
      <FinalCTA />
      <Contact />
    </div>
  );
}
