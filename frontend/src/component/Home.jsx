function Home() {
  const videos = ["/Carousels/Carousel-1.mp4", "/Carousels/Carousel-2.mp4", "/Carousels/Carousel-3.mp4"];

  return (
    <>
      <link rel="preload" as="video" href={videos[0]} type="video/mp4" />

      <div
        id="carouselExampleRide"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        {/* Indicators (dots) */}
        <div className="carousel-indicators">
          {videos.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleRide"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {videos.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
                className="d-block w-100"
                aria-label={`Slide ${index + 1}`}
                style={{ objectFit: "contain" }}
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
