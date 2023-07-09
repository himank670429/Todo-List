import Header from '../components/container/Header'
import Main from '../components/container/Main'
import Footer from '../components/container/Footer'
import useTaskGroupModalRef from '../hooks/useTaskGroupModalRef';
function Home() {
  const ref = useTaskGroupModalRef();
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default Home