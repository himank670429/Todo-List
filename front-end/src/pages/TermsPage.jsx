import Footer from "../components/container/Footer"
import TermsContent from "../assets/terms"
function TosPage() {
return (
<>
    <div className="header">
        <span className = "header-item logo">
            <span>Terms and Conditions</span>
        </span>
    </div>
    <div className="main tos">
        <TermsContent />
    </div>
    <Footer />
</>
)
}

export default TosPage