import "../../css/HomeCarousel.css";

const HomeCarousel = () => {
  const slides = [
    {
      id: 1,
      bgClass: "slide-bg-1",
      smallTitle: "Sneakers",
      mainTitle: "Under ₹599",
      leftTag1: "TOP BRANDS",
      leftTag2: "LATEST TRENDS",
      buttonText: "Shop Now",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      alt: "sneakers",
    },
    {
      id: 2,
      bgClass: "slide-bg-2",
      smallTitle: "Fashion",
      mainTitle: "New Arrivals",
      leftTag1: "PREMIUM PICKS",
      leftTag2: "STYLISH LOOKS",
      buttonText: "Explore",
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      alt: "fashion",
    },
    {
      id: 3,
      bgClass: "slide-bg-3",
      smallTitle: "Electronics",
      mainTitle: "Smart Gadgets",
      leftTag1: "BEST DEALS",
      leftTag2: "LIMITED TIME",
      buttonText: "Buy Now",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      alt: "electronics",
    },
    {
      id: 4,
      bgClass: "slide-bg-4",
      smallTitle: "Watches",
      mainTitle: "Luxury Styles",
      leftTag1: "TRENDING NOW",
      leftTag2: "EXCLUSIVE OFFERS",
      buttonText: "View Collection",
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      alt: "watch",
    },
    {
      id: 5,
      bgClass: "slide-bg-5",
      smallTitle: "Beauty",
      mainTitle: "Glow & Care",
      leftTag1: "TOP PICKS",
      leftTag2: "SELF CARE",
      buttonText: "Shop Beauty",
      image:
        "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg",
      alt: "beauty",
    },
    {
      id: 6,
      bgClass: "slide-bg-6",
      smallTitle: "Home Decor",
      mainTitle: "Modern Living",
      leftTag1: "FURNITURE",
      leftTag2: "HOME ESSENTIALS",
      buttonText: "Discover More",
      image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      alt: "home decor",
    },
  ];

  return (
    <section className="home-carousel-section">
      <div
        id="homeCarousel"
        className="carousel slide home-carousel"
        data-bs-ride="carousel"
        data-bs-interval="3500"
      >
        {/* INDICATORS */}
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className={`carousel-custom-bg ${slide.bgClass}`}>
                <div className="container-fluid carousel-inner-container">
                  <div className="row align-items-center gy-4">
                    {/* LEFT TEXT */}
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-section">
                        <h3 className="small-title">{slide.smallTitle}</h3>

                        <h1 className="main-title">{slide.mainTitle}</h1>

                        <div className="brands-section">
                          <span>{slide.leftTag1}</span>
                          <span className="divider">|</span>
                          <span>{slide.leftTag2}</span>
                        </div>

                        <button className="offer-btn">
                          {slide.buttonText}
                        </button>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="col-lg-6 col-md-6 col-12 text-center">
                      <div className="carousel-image-wrapper">
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="carousel-product-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PREV */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon custom-arrow"></span>
        </button>

        {/* NEXT */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon custom-arrow"></span>
        </button>
      </div>
    </section>
  );
};

export default HomeCarousel;
