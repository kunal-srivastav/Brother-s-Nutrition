import { useEffect, useState } from "react";
import "./Contact.css";

function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className={`text-center mb-5 fade-right ${visible ? "visible" : ""}`}>
        <h2 className="display-6 fw-bold text-danger">Contact Us</h2>
        <p className="text-muted">
          We’d love to hear from you — reach out anytime.
        </p>
        <hr className="mx-auto border-2 border-danger" style={{ width: "90px" }} />
      </div>

      {/* Main Section */}
      <div className="row align-items-center g-5 flex-lg-row-reverse">
        {/* Video Section */}
        <div className={`col-10 col-sm-8 col-lg-5 mx-auto fade-left ${visible ? "visible" : ""}`}>
          <video
            src="./contact.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg contact-img"
          />
        </div>

        {/* Text Section */}
        <div className={`col-lg-6 fade-right ${visible ? "visible" : ""}`}>
          <h3 className="display-6 fw-semibold fs-3 text-dark lh-1 mb-3">
            Get in Touch
          </h3>

          {/* Contact Info */}
          <p className="fw-semibold mt-3 mb-1 text-danger">
            Brother’s Nutrition Support
          </p>
          <p className="text-secondary mb-4">
            📧 Email: support@brothersnutrition.com
            <br />
            📞 Phone: +91 98765 43210
            <br />
            🌐 Website: www.brothersnutrition.com
            <br />
            💬 Social: Instagram / Facebook / X
          </p>

          {/* Careers */}
          <h5 className="fw-bold text-dark">Join Our Team</h5>
          <p className="text-muted mb-4">
            We’re always looking for passionate individuals interested in fitness, nutrition, or wellness. 
            Explore opportunities to work with our brand online.
          </p>
          <button className="btn contact-btn btn-outline-danger btn-lg px-4">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;