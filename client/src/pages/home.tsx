import Header from "@/components/header";
import Hero from "@/components/hero";
import Updates from "@/components/updates";
import Enrollment from "@/components/enrollment";
import Staff from "@/components/staff";
import LearningModality from "@/components/learning-modality";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Updates />
        <Enrollment />
        <Staff />
        <LearningModality />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
