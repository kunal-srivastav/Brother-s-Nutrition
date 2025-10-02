function Home() {
  const videos = [
    {
      src: "/Carousels/Untitled design.mp4",
      poster: "/Carousels/Untitled design.jpg", // fallback image
    },
    {
      src: "/Carousels/Carousel-2.mp4",
      poster: "/Carousels/Carousel-2.jpg",
    },
    {
      src: "/Carousels/Carousel-3.mp4",
      poster: "/Carousels/Carousel-3.jpg",
    },
  ];

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
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

      {/* Carousel Items */}
      <div className="carousel-inner">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="10000"
          >
            <video
              src={video.src}
              poster={video.poster}   // ✅ fallback image
              className="d-block w-100"
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: "cover", maxHeight: "680px" }}
            />
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Home;
