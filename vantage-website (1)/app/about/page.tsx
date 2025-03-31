import Header from "@/components/header"
import AboutHero from "@/components/about-hero"
import AboutTeam from "@/components/about-team"
import AboutBody from "@/components/about-body"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <AboutHero />
      {/* <AboutTeam /> */}
      <div className="relative">
        <AboutBody />
        <div className="-mt-[30px] relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  )
}

