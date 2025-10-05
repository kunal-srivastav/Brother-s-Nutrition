import { useEffect, useState } from "react";
import "./About.css"; // <-- import CSS file here

function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className={`text-center mb-5 fade-section ${visible ? "visible" : ""}`}>
        <h2 className="display-5 fw-bold mb-2">About Us</h2>
        <p className="text-muted">
          Empowering your fitness goals with trusted nutrition.
        </p>
        <hr className="mx-auto border-2 border-dark" style={{ width: "80px" }} />
      </div>

      {/* Main Section */}
      <div className="row align-items-center g-5">
        {/* Image */}
        <div className={`col-10 col-sm-8 col-lg-6 mx-auto fade-section ${visible ? "visible" : ""}`}>
          <img
            src="./about.png"
            loading="lazy"
            alt="About Brother's Nutrition"
            className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg about-img"
          />
        </div>

        {/* Text */}
        <div className={`col-lg-6 fade-section ${visible ? "visible" : ""}`}>
          <h3 className="fw-bold mb-3">
            Fueling Your <span className="text-danger">Fitness Journey</span>
          </h3>

          <p className="lead text-secondary">
            At <strong>Brother’s Nutrition</strong>, we’re more than just a
            supplement store — we’re your fitness partner. Our goal is to
            provide authentic, high-quality supplements from trusted brands,
            helping you achieve your health and fitness goals with confidence.
          </p>

          <h5 className="fw-bold mt-4 text-dark">Our Mission</h5>
          <p className="text-muted">
            We aim to make genuine supplements accessible and affordable for
            everyone. Whether you’re an athlete, gym enthusiast, or someone
            starting their fitness journey, we’re here to support you every step
            of the way with trusted products and expert guidance.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className={`mt-5 text-center fade-section ${visible ? "visible" : ""}`}>
        <h3 className="fw-bold mb-4 text-dark">
          Why Choose Brother’s Nutrition
        </h3>

        <div className="row gy-4 justify-content-center">
          {[
            "100% authentic supplements from verified brands",
            "Affordable prices and regular discounts",
            "Fast, reliable, and secure delivery",
            "Friendly customer support and easy returns",
            "Trusted by thousands of fitness lovers nationwide",
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="p-4 border rounded-4 shadow-sm bg-light h-100 feature-card">
                <span className="fs-4 text-success">✔</span>
                <p className="mt-2 mb-0 fw-semibold">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
