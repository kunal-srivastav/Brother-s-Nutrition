
function Contact() {
  return (
    <div className="container-fluid">
    <h2 className='display-6 fw-bold text-center' >Contact Us <hr /></h2>
    <div className="row flex-lg-row align-items-center g-5">
    <div className="col-10 col-sm-8 col-lg-5">
      <img src="./contact.jpg" loading="lazy" className=" mx-lg-auto img-fluid" width="600" height="400" />
    </div>
    <div className="col-lg-6">
      <h1 className="display-6 fw-semibold fs-3 text-body-emphasis lh-1 mb-3">Our Store</h1>
      <p className="fw-semibold mt-3">ACME Corporation</p>
      <p className=''>
        1123 Fictional St,
        <br />
        San Francisco, CA 94103
        <br />
        P: (123) 456-7890
        <br />
        <span>
        Full Name: first.last@example.com </span>
        </p>
        <h5>Careers of forever</h5>
        <p>Learn more about our team and job opening</p>
        <button type="button" className="btn btn-outline-primary btn-lg px-4 me-md-2">Explore Jobs</button>
      </div>
    </div>
  </div>
  )
}

export default Contact