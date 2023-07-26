import Footer from '../components/container/Footer'
import PrivacyContent from '../assets/Privacy'
function PrivacyPage() {
  return (
    <>
        <div className="header">
          <span className= "header-item logo">
            <span>Pricay Policy</span>
          </span>
        </div>
        <div className="main">
            <PrivacyContent />
        </div>
        <Footer />
    </>
  )
}

export default PrivacyPage