import NavBar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import "../styles/bootstrap_override.css"; // Custom overrides
import headerImage from '../assets/aba.png';
function HomePage() {
  return (
    <>
      <NavBar rightsignup={true} />
      {/* placeholder image */}
      {/* <div className="text-center mt-4">
      <img src={headerImage} alt="Aba" className="img-fluid" style={{ maxWidth: "700px", height: "auto" }} />
      </div> */}
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center text-white">
            <h1 className="display-2 mb-4">
              Welcome to the gateway of<br />
              <span className="financial-learning">Financial&nbsp;Learning</span>
            </h1>
            <p className="lead mb-4">
              Get ready to unlock a wealth of knowledge, develop critical thinking skills, and gain a practical understanding
              of stock trading strategies and market analysis.
            </p>
            <a href="/signup" className="btn btn-primary btn-lg px-5 py-3 custom-pink">JOIN NOW!</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
