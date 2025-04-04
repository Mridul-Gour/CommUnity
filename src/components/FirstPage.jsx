
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import "../components/FirstPage.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Community</h1>
        <p className="welcome-text">
          Welcome to <strong>Commünity</strong>, the ultimate platform designed to streamline
          housing society management and foster community connections.
        </p>
        <button className="get-started-btn" onClick={() => navigate("/signup")}>
          Get Started
        </button>

        <h2>About Community</h2>
        <p className="about-text">
          Our website is dedicated to providing seamless interaction and management within our community.
          We strive to offer the best services to ensure a cohesive and supportive environment for all members.
        </p>

        <h2>Why Community?</h2>
        <p className="why-text">
          Community makes society management simple and efficient with seamless account management, instant access 
          to a digital noticeboard, and easy online maintenance payments. Residents can raise and track complaints, 
          join clubs, and share personal recommendations. Admins can post commercial updates and conduct polls. 
          Stay informed with emergency contacts, security personnel details, and real-time WhatsApp notifications, 
          ensuring a connected and engaged community experience.
        </p>

        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:communitysupport@mail.com">communitysupport@mail.com</a></p>
        <p>Phone: 9926508886</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
