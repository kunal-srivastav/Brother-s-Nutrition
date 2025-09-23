import React, { Suspense, useEffect, useState } from "react";
import { getProduct } from "../features/products/productController";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toggleProductInCart } from "../features/carts/CartController";
const ReviewForm = React.lazy(() => import("../component/ReviewForm"));
const ReviewsList = React.lazy(() => import("../component/ReviewsList"));
import "./Product.css";
import { isProductInCart } from "../features/carts/cartSlice";
import { StarFull, StarHalf, StarOutline } from "../component/Icons";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)
      stars.push(<StarFull  key={i} size={25} />);
    else if (rating >= i - 0.5)
      stars.push(<StarHalf key={i} size={25} color="#FFD700" />);
    else
      stars.push(<StarOutline key={i} size={25} color="#FFD700" />);
  }
  return stars;
};

function Product() {

  const { productId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { product, relatedProducts } = useSelector((state) => state.products);
  const { added } = useSelector((state) => state.carts);

  useEffect(() => {
    if (product?.images?.length) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  // Fetch product + check cart
  useEffect(() => {
    if (productId) {
      dispatch(isProductInCart(productId));
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  const handleCartbtn = () => {
    dispatch(toggleProductInCart({ productId: product._id, quantity }));
  };

  // Check if this product is already in cart

  return (
    <div className="product-page container my-5">
      <div className="row g-5">
        {/* Images */}
        <div className="col-lg-5">
          <div className="main-image-wrapper mb-3">
            <img loading="lazy" src={currentImage || product?.images[0]} alt={product?.name}
              className="img-fluid rounded shadow main-img" style={{ cursor: "pointer" }}
              onClick={() => setOpen(true)} />
          </div>
          <div className="d-flex flex-wrap gap-2 thumbnail-wrapper">
            {product?.images?.map((img, idx) => (
              <img loading="lazy" key={idx} src={img} alt={`thumbnail-${idx}`}
                className={`thumbnail-img ${currentImage === img ? "selected" : "" }`}
                onClick={() => setCurrentImage(img)} />
            ))}
          </div>

          {/* Modal */}
          {open && (
            <>
              {/* Backdrop */}
              <div className="modal-backdrop fade show" onClick={() => setOpen(false)}
                style={{ zIndex: 1040 }} />

              {/* Modal */}
              <div className="modal fade show d-block" role="dialog" aria-modal="true"
                style={{ zIndex: 1050 }} >

                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content position-relative">
                    {/* Close button */}
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
                      onClick={() => setOpen(false)} aria-label="Close" style={{ zIndex: 1060 }} />

                    {/* Modal body */}
                    <div className="modal-body p-0">
                      <div id="carouselExample" className="carousel slide">
                        
                        {/* Indicators (dots) */}
                        <div className="carousel-indicators">
                          {product?.images?.map((img, idx) => (
                            <button key={idx} type="button" data-bs-target="#carouselExample"
                              data-bs-slide-to={idx}
                              className={idx === 0 ? "active" : ""}
                              aria-current={idx === 0 ? "true" : undefined}
                              aria-label={`Slide ${idx + 1}`} />
                          ))}
                        </div>

                        {/* Carousel images */}
                        <div className="carousel-inner">
                          {product?.images?.map((img, idx) => (
                            <div className={`carousel-item ${idx === 0 ? "active" : ""}`}
                              key={idx} >
                              <img src={img} className="d-block w-100"
                                alt={`Slide ${idx + 1}`}
                                style={{ maxHeight: "80vh", objectFit: "contain" }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Carousel controls */}
                        <button className="carousel-control-prev" type="button"
                          data-bs-target="#carouselExample" data-bs-slide="prev" >
                          <span
                            className="carousel-control-prev-icon bg-dark rounded-circle p-2"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button"
                          data-bs-target="#carouselExample" data-bs-slide="next" >
                          <span
                            className="carousel-control-next-icon bg-dark rounded-circle p-2"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="col-lg-7">
          <h2 className="fw-bold mb-2">{product?.name}</h2>
          <div className="d-flex align-items-center mb-3">
            {renderStars(product?.averageRating)}
            <span className="ms-2 text-muted small">
              ({product?.numberOfReviews} reviews)
            </span>
          </div>

          <div className="mb-3">
            <span className="fs-2 fw-bold text-success">
              ₹{product?.finalPrice}
            </span>
            {product?.discount > 0 && (
              <del className="ms-2 text-secondary fs-5">₹{product?.price}</del>
            )}
          </div>

          <p className="mb-3 text-muted">{product?.description}</p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-primary" disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)} >
              −
            </button>
            <input type="text" className="form-control text-center mx-2"
              style={{ width: "60px" }} value={quantity} readOnly />
            <button className="btn btn-outline-primary" disabled={quantity === 12}
              onClick={() => setQuantity(quantity + 1)} >
              +
            </button>
          </div>

          <button className={`btn ${added ? "btn-danger" : "btn-success"} mb-3`}
            onClick={handleCartbtn} >
            {added ? "Remove from Cart" : "Add to Cart"}
          </button>

          <div className="text-muted small">
            {product?.stock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              "Out of Stock"
            )}
            <br />
            100% Original Product
            <br />
            Cash on delivery available
            <br />
            Easy return within 7 days
          </div>
        </div>
      </div>

      {/* Reviews */}
      <Suspense fallback={"Loading"} >
        <div className="mt-5">
          <ReviewForm productId={product?._id} />
          <ReviewsList productId={product?._id} />
        </div>
      </Suspense>


      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center mb-4">Related Products</h3>
          <div className="row row-cols-2 row-cols-md-4 g-4">
            {relatedProducts?.map((p) => (
              <div className="col" key={p?._id}>
                <Link to={`/product/${p?._id}`} className="text-decoration-none" >
                  <div className="card h-100 shadow-sm">
                    <img src={p?.images[0]} loading="lazy" className="card-img-top" alt={p?.name} />
                    <div className="card-body text-center">
                      <p className="mb-1 text-dark">{p?.name}</p>
                      <p className="mb-0 fw-bold text-success">
                        ₹{p?.finalPrice}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;