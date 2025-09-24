import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../pages/Product.css";
import { getAllProducts } from "../features/products/productController";

// Lazy-loaded components
const ProductCard = React.lazy(() => import("./ProductCard"));
const Pagination = React.lazy(() => import("./Pagination"));
import SkeletonProduct from "./SkeletonProduct.jsx";

function LatestCollection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productCategory = useMemo(() => [
    { img: "https://cdn2.nutrabay.com/marketing-journey/Gold-Whey-1753207699.png", category: "Protein" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/Creatine-1753207660.png", category: "Creatine" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/Mega-Mass-1753207721.png", category: "Weight-Gainer" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/Pre-workout-1753207770.png", category: "Pre-Workout" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/Fish-Oil-1753207680.png", category: "Omega-3" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/BCAA-2025-03-13T11:45:58.png", category: "BCAA" },
    { img: "https://cdn2.nutrabay.com/marketing-journey/Multivamin-2025-03-13T11:46:21.png", category: "Multivitamin" }
  ], []);

  const { products, totalPages, loading } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const limit = 15;

  useEffect(() => {
    dispatch(getAllProducts({ page, limit }));
  }, [page, limit, dispatch]);

  // Preload the first product image for faster LCP
  const firstProductImage = products?.[0]?.image;

  return (
    <div className="container-fluid">
      {/* Preload first product image */}
      {firstProductImage && <link rel="preload" as="image" href={firstProductImage} />}

      {/* Product Categories */}
      <div className="d-flex flex-wrap justify-content-center text-center mt-3 gap-3">
        {productCategory.map(({ img, category }, index) => (
          <div
            key={index}
            onClick={() => navigate(`/collection?category=${category}`)}
            style={{ cursor: "pointer", widows: "70px", flexShrink: 0 }}
          >
            <img
              src={img}
              alt={category}
              loading="lazy"
              className="rounded-circle bg-secondary-subtle"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                border: "2px solid #ddd",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <p className="small fw-medium mt-1">{category}</p>
          </div>
        ))}
      </div>

      <p className="fs-1 mt-1 text-center fw-bold">Latest Products</p>

      {/* Latest Products Grid */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 bg-body-tertiary p-2 mb-3 rounded">
        {loading ? (
          <SkeletonProduct count={limit} />
        ) : products?.length ? (
          <Suspense fallback={<SkeletonProduct count={limit} />}>
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product}
                loading={index === 0 ? "eager" : "lazy"} // Eager load first product for LCP
              />
            ))}
          </Suspense>
        ) : (
          <div className="col-12 text-center py-3">
            <h5 className="text-muted">No products available</h5>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Suspense fallback={<div className="text-center py-3">Loading Pagination...</div>}>
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </Suspense>
    </div>
  );
}

export default LatestCollection;