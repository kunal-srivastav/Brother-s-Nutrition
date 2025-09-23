
function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">

        {/* Brand / About */}
        <div className="text-center mb-4">
          <h4 className="fw-bold">Supplemart</h4>
          <p className="small text-muted">
            Your trusted source for 100% authentic supplements, delivered directly from us.
          </p>
        </div>

        {/* Features / Speciality */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <h6 className="fw-bold">Our Speciality</h6>
            <p className="small mb-2">
              We deliver all products directly from us, without middlemen, ensuring every supplement is <strong>100% authentic</strong>.
            </p>
            <p className="small mb-2">
              Your satisfaction is our priority. We focus on <strong>fast delivery, high-quality products, and great user experience</strong>.
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold">Authenticity Guarantee</h6>
            <p className="small mb-2">
              Supplemart guarantees authenticity on all products. You can be confident in every purchase.
            </p>
            <p className="small mb-2">
              Multi-brand store since 2025, including our own supplement range. Genuine products at fair prices.
            </p>
          </div>
        </div>

        <hr />

        {/* Bottom Line */}
        <div className="text-center text-muted small">
          &copy; {new Date().getFullYear()} Supplemart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
