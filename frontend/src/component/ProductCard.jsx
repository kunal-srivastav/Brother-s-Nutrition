import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductCard ({product}) {

    const { loggedInUser } = useSelector(state => state.users);

    return (
        <div className="col d-flex" key={product?._id}>
            <div className="product-card card flex-fill shadow-sm border-0 d-flex flex-column">
            <Link to={loggedInUser ? `/product/${product?._id}` : "/login"}
                className="text-decoration-none text-dark flex-grow-1" >
                <div className="product-image position-relative">
                <img src={product?.images[0]} loading="lazy"
                    alt={product?.name} className="img-fluid" />
                    {product.discount && (
                    <span className="ribbon">
                      {product?.discount}% OFF
                    </span>
                    )}
                </div>
            </Link>
            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                <p className="fw-semibold product-name text-truncate">
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