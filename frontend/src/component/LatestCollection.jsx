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
    { img: "/product-category/Whey-protein.png", category: "Protein" },
    { img: "/product-category/Creatine.png", category: "Creatine" },
    { img: "/product-category/Mass-gainer.png", category: "Weight-Gainer" },
    { img: "/product-category/Pre-workout.png", category: "Pre-Workout" },
    { img: "/product-category/Fish-oil.png", category: "Omega-3" },
    { img: "/product-category/BCAA.png", category: "BCAA" },
    { img: "/product-category/Multivitamin.png", category: "Multivitamin" }
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
      <div className="d-flex justify-content-evenly product-category-slider mt-3">
        {productCategory.map(({ img, category }, index) => (
          <div key={index} className="category-item text-center"
            onClick={() => navigate(`/collection?category=${category}`)} >
            <img src={img} alt={category} loading="lazy"
              className="rounded-circle category-img bg-secondary-subtle" />
            <p className="text-muted small fw-semibold mt-2">{category}</p>
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
          <div className="col-12 py-3 w-100 text-center">
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