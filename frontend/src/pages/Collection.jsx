import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect, useState } from 'react';
import "./Product.css";
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../features/products/productController';

const Pagination = React.lazy(() => import('../component/Pagination'));
const FilterForm = React.lazy(() => import('../component/FilterForm'));
const ProductCard = React.lazy(() => import('../component/ProductCard'));
import SkeletonProduct from '../component/SkeletonProduct.jsx';

function Collection() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const price = searchParams.get("range");
  const rating = searchParams.get("rating");

  const { products, totalPages, totalProducts, loading } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 30;

  useEffect(() => {
    dispatch(getAllProducts({ query, category, brand, price, rating, page, limit }));
  }, [query, category, brand, price, rating, page, dispatch]);

  return (
    <div className='d-flex justify-content-around'>
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Desktop Filter */}
          <aside className="col-lg-3 d-none d-lg-block">
            <Suspense fallback={<p>Loading filters...</p>}>
              <FilterForm />
            </Suspense>
          </aside>

          {/* Product Grid */}
          <main className="col-lg-9">
            {products?.length > 0 && (
            <small className="text-muted">
              Page {page} of {totalPages} ({totalProducts} products)
            </small>
            )}

            {/* Mobile Filter Button */}
            <div className="d-lg-none mb-3 text-end">
              <button className="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#mobileFilter">
                <i className="bi bi-funnel"></i> Filters
              </button>
            </div>

            {/* Products / Skeleton */}
            <div className="row row-cols-2 row-cols-md-3 g-2 mt-2">
              {loading ? (
                <SkeletonProduct count={limit} />
              ) : products?.length > 0 ? (
                products.map(product => (
                  <Suspense key={product._id} fallback={<SkeletonProduct count={1} />}>
                    <ProductCard product={product} />
                  </Suspense>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h5 className="text-muted">No products found</h5>
                </div>
              )}
            </div>

            {/* Pagination */}
            {products?.length > 0 && (
            <Suspense fallback={<p>Loading pagination...</p>}>
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </Suspense>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Offcanvas */}
      <div className="offcanvas w-75 offcanvas-start" tabIndex="-1" id="mobileFilter">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filters</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <Suspense fallback={<p>Loading filters...</p>}>
            <FilterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Collection;