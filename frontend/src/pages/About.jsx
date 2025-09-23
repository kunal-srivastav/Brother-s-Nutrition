
function About() {
  return (
    <>
    <h2 className='display-6 fw-bold text-center' >About Us</h2>
    <div className="row flex-lg-row-reverse align-items-center g-5">
    <div className="col-10 col-sm-8 col-lg-6">
      <img src="./about.jpg" loading="lazy" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
    </div>
    <div className="col-lg-6">
      <h1 className="display-6 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
      <p>Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <h5 className='fw-bold'>Our Mission</h5>
      <p>Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins.</p>
    </div>
    <h3 className='fw-bold'>Why you choose us-</h3>
  </div>
  </>
  )
}

export default About;