function Home() {
  const videos = [
    "/Carousels/Carousel-1.mp4",
    "/Carousels/Carousel-2.mp4",
    "/Carousels/Carousel-3.mp4",
  ];

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ width: "100%" }}
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {videos.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {videos.map((src, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            {/* Aspect ratio wrapper */}
            <div
              className="carousel-wrapper"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "1900px",
                paddingTop: "21%", // 400 ÷ 1900 ≈ 0.21
                overflow: "hidden",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // fills container without stretching
                }}
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Home;
