import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProduct } from "../features/products/productController";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../component/Icons";

function ProductList() {

  const dispatch = useDispatch();
  const { adminProducts } = useSelector(state => state.products); 

  useEffect(() => {
    dispatch(getAdminProduct()); 
  }, [adminProducts]);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminProducts?.length > 0 ? (
            adminProducts?.map((product) => (
              <tr key={product?._id}>
                <td>
                  <img loading="lazy" src={product.images[0]}
                    alt="product" width={70} height={70}
                    style={{ objectFit: "cover" }} />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <Link className="mx-2" to={`/admin/update-product/${product?._id}`}>
                    <Icon name={"Edit"} size={20} color="black" />
                  </Link>
                </td>
                <td>
                  <Icon name={"Delete"} size={20} style={{ cursor: "pointer" }} onClick={() => dispatch(deleteProduct(product?._id))} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No product found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
