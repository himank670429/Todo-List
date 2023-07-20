import Header from "../components/container/Header"
import Footer from "../components/container/Footer"
import AboutContent from "../assets/About"
function AboutUsPage() {
  return (
    <>
    <Header />
    <div className="main about">
      <AboutContent />
    </div>
    <Footer />
    </>
  )
}

export default AboutUsPage