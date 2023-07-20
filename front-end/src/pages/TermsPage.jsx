import Header from "../components/container/Header"
import Footer from "../components/container/Footer"
import TermsContent from "../assets/terms"
function TosPage() {
return (
<>
    <Header />
    <div className="main tos">
        <TermsContent />
    </div>
    <Footer />
</>
)
}

export default TosPage