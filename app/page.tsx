import Navbar from "@/components/Navbar";
import HeroScrollExperience from "@/components/HeroScrollExperience";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import VideoEditing from "@/components/sections/VideoEditing";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import Resume from "@/components/sections/Resume";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />

      {/* 
        Hero Section: 
        This handles the 500vh scroll space. 
        The content inside is sticky. 
      */}
      <HeroScrollExperience />

      {/* 
        Main Content:
        These sections appear after the hero scroll is finished?
        Actually, if Hero is 500vh, we scroll 500vh then these appear.
        This seamlessly transitions from the story to the details.
      */}
      <div className="relative z-10 bg-white">
        <About />
        <Projects />
        <VideoEditing />
        <Skills />
        <Journey />
        <Contact />
        <Resume />
        <Footer />
      </div>
    </main>
  );
}
