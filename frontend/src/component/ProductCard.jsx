import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductCard ({product}) {

    const { loggedInUser } = useSelector(state => state.users);

    return (
        <div className="col d-flex" key={product?._id}>
            <div className="product-card card flex-fill shadow-sm border-0 d-flex flex-column h-100">
            <Link to={loggedInUser ? `/product/${product?._id}` : "/login"}
                className="text-decoration-none text-dark flex-grow-1" >
                <div className="product-image position-relative text-center">
                <img src={product?.images[0]} loading="lazy"
                    alt={product?.name} className="img-fluid" />
                    {product.discount && (
                    <span className="ribbon">
                      {product?.discount}% OFF
                    </span>
                    )}
                </div>
            </Link>
            <div className="p-3 mt-auto">
                <p className="product-name mb-1">
                {product?.name}
                </p>
                <div>
                <span className="fw-bold fs-5 text-dark">
                    ₹{product?.finalPrice}
                </span>
                </div>
            </div>
            </div>
        </div>
    )
};

export default ProductCard;