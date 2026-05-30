"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Showcase from "@/components/Showcase";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <About />
      <Services />
      <Projects />
      <Skills />
      <Showcase />
      <Testimonial />
      <Contact />
      <Footer />
    </main>
  );
}
