import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/works/Works";
import About from "@/components/About";
import Services from "@/components/services/Services";
import Archive from "@/components/archive/Archive";
import Contact from "@/components/Contact";
import ScrollHud from "@/components/ScrollHud";
import Cursor from "@/components/Cursor";
import Motion from "@/components/motion/Motion";
import PlayerProvider from "@/components/player/PlayerProvider";

export default function Home() {
  return (
    <PlayerProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Intro />
      <Header />
      <main id="main">
        <Hero />
        <Works />
        <About />
        <Services />
        <Archive />
        <Contact />
      </main>
      <ScrollHud />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Motion />
    </PlayerProvider>
  );
}
