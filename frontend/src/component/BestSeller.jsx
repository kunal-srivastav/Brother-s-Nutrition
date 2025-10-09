import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BestSeller() {

  const { loggedInUser } = useSelector((state) => state.users);
  const { products } = useSelector(state => state.products);

  const discountedProducts = useMemo(() => {
    return products?.filter(p => p.discount) || [];
  }, [products]);

  return (
    <>
      {discountedProducts?.length > 0 && (
        <div className="my-1">
          <h1 className="fw-bold text-center mb-3">Best Offers</h1>
          <div className="d-flex flex-nowrap overflow-auto pb-3 px-2 bg-body-tertiary rounded">
            {discountedProducts?.slice(0, 10).map((product) => (
              <Link key={product._id} to={loggedInUser ? `/product/${product._id}` : "/login"}
                className="text-decoration-none text-dark me-3 flex-shrink-0 product-carousel-card shadow-sm border-0 rounded bg-white"
                style={{ minWidth: "180px", maxWidth: "200px" }} >
                <div className="position-relative">
                  <img loading="lazy" src={product?.images?.[0]} alt={product.name}
                    className="img-fluid p-3" style={{ height: "160px", objectFit: "contain" }}
                  />
                  <span className="ribbon">{product.discount}% OFF</span>
                </div>
                <div className="p-2 text-center">
                  <p className="product-name">{product.name}</p>
                  <span className="product-price">₹{product.finalPrice}</span>
                  <span className="product-price-original">₹{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default BestSeller;