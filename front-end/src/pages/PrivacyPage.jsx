import Footer from '../components/container/Footer'
import PrivacyContent from '../assets/Privacy'
function PrivacyPage() {
  return (
    <>
        <div className="header">
          <span className= "header-item logo">
            <span data-color = 'blue'>Pricay&nbsp;</span>
            <span >Policy Page </span>
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