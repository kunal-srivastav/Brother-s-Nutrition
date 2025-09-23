import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const FormSpinnerWrapper = React.lazy(() => import("../component/FormSpinnerWrapper"));
import { useToastMessage } from "../features/utils/useToastMessage";
import { setErrorMsg } from "../features/messages/messagesSlice";
import { createProduct, updateProduct } from "../features/products/productController";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../component/Icons";

function ProductForm() {

  const { productId } = useParams();
  const navigate = useNavigate();
  const [imagesFile, setImagesFile] = useState([null, null, null, null]);
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  const [productData, setProductData] = useState({
    name: "", description: "", category: "", weight: "", brand: "",
    servingSize: "", price: "", discount: "", stock: "", isAvailable: true,
  });

  const dispatch = useDispatch();
  const { loading, errorMsg, successMsg, adminProducts } = useSelector(state => state.products);

  useEffect(() => {
    if(productId && adminProducts) {
      const currProduct = adminProducts?.find(product => product?._id === productId);
      if(currProduct) {
        setProductData({
          name: currProduct?.name || "",
          description: currProduct?.description || "",
          category: currProduct?.category || "",
          weight: currProduct?.weight || "",
          brand: currProduct?.brand || "",
          servingSize: currProduct?.servingSize || "",
          price: currProduct?.price || "",
          discount: currProduct?.discount || "",
          stock: currProduct?.stock || "",
          isAvailable: currProduct?.isAvailable || true
        });
        setPreviewImages(currProduct?.images);
        setImagesFile(currProduct?.images)
      };
    }
  }, [productId, adminProducts]);

  useToastMessage(errorMsg, successMsg);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...imagesFile];
    const newPreview = [...previewImages];

    newFiles[index] = file;
    newPreview[index] = URL.createObjectURL(file);

    setImagesFile(newFiles);
    setPreviewImages(newPreview);
    e.target.value = ""; // reset input to allow re-upload of same file
  };

  // remove image
  const handleRemoveImage = (index) => {
    const newFiles = [...imagesFile]
    const newPreview = [...previewImages];
    
    newFiles[index] = null;
    newPreview[index] = null;

    setImagesFile(newFiles);
    setPreviewImages(newPreview);
  };

  // submit form
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("weight", productData.weight);
    formData.append("brand", productData.brand);
    formData.append("servingSize", String(productData.servingSize));
    formData.append("price", String(productData.price));
    formData.append("discount", String(productData.discount));
    formData.append("stock", String(productData.stock));
    formData.append("isAvailable", String(productData.isAvailable));

    imagesFile.forEach((img) => {
      if (img) formData.append("images", img);
    });

    try {
      if(productId) {
        await dispatch(updateProduct({productId, formData})).unwrap();
      } else {
        await dispatch(createProduct(formData)).unwrap();
      };
      setProductData({name: "", description: "", category: "", weight: "", servingSize: "",
      price: "", discount: "", stock: "", isAvailable: true });
      setImagesFile([null, null, null, null]);
      setPreviewImages([null, null, null, null]);

      navigate("/admin");
    } catch (err) {
      dispatch(setErrorMsg(err || "Something went wrong"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-2 pb-5">
      <FormSpinnerWrapper loading={loading}>
        <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "700px", width: "100%" }}>
          <div className="card-body p-5">
            <h2 className="fw-bold text-primary mb-4 text-center">
              {productId ? "Update Product" : "Create Product"}
            </h2>

            {/* Upload Section */}
            <p className="fw-semibold mb-2">Upload Images</p>
            <div className="d-flex flex-wrap gap-3 mb-4">
              {previewImages?.map((img, i) => (
                <div key={i}
                  className="position-relative bg-light border border-dashed rounded-3 d-flex justify-content-center align-items-center"
                  style={{ width: "100px", height: "100px", cursor: "pointer" }} >
                  {img ? (
                    <>
                      <img src={img} loading="lazy" alt="preview" className="w-100 h-100 object-fit-cover rounded-3" />
                      <button type="button"
                        className="btn btn-sm btn-transparent position-absolute top-0 end-0 rounded-circle"
                        onClick={() => handleRemoveImage(i)} >
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <label htmlFor={`fileInput-${i}`} className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Icon name={"FolderUp"} size={35} color="#6c757d" />
                      </label>
                      <input id={`fileInput-${i}`} type="file" accept="image/*" hidden
                        onChange={(e) => handleFileChange(e, i)} />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Product Form */}
            <form onSubmit={handleOnSubmit}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="productName"
                  name="name" value={productData.name} onChange={handleOnChange}
                  placeholder="Product Name" required />
                <label htmlFor="productName">Product Name</label>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <textarea className="form-control" id="productDescription" name="description"
                  value={productData.description} onChange={handleOnChange}
                  placeholder="Product Description" style={{ height: "100px" }} required />
                <label htmlFor="productDescription">Product Description</label>
              </div>

              {/* Category, Brand & Weight */}
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <div className="form-floating">
                    <select className="form-select" id="category" name="category"
                      value={productData.category} onChange={handleOnChange} required >
                      <option value="">Select Category</option>
                      <option value="BCAA">BCAA</option>
                      <option value="Creatine">Creatine</option>
                      <option value="Fat-Burner">Fat Burner</option>
                      <option value="Multivitamins">Multivitamins</option>
                      <option value="Omega-3">Omega 3</option>
                      <option value="Pre-Workout">Pre-Workout</option>
                      <option value="Protein">Protein</option>
                      <option value="Weight Gainer">Weight Gainer</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="category">Category</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <select className="form-select" id="brand" name="brand"
                      value={productData.brand || ""} onChange={handleOnChange} required >
                      <option value="">Select Brand</option>
                      <option value="MuscleBlaze">MuscleBlaze</option>
                      <option value="ON">ON</option>
                      <option value="GNC">GNC</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="brand">Brand</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <select className="form-select" id="weight" name="weight"
                      value={productData.weight} onChange={handleOnChange} required >
                      <option value="">Select Weight</option>
                      <option value="250g">250 g</option>
                      <option value="500g">500 g</option>
                      <option value="1kg">1 kg</option>
                      <option value="3kg">3 kg</option>
                      <option value="5kg">5 kg</option>
                    </select>
                    <label htmlFor="weight">Weight</label>
                  </div>
                </div>
              </div>

              {/* Price, Serving Size, Discount */}
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <div className="form-floating">
                    <input min={0} max={10000} type="number" className="form-control"
                      name="price" value={productData.price} onChange={handleOnChange}
                      required />
                    <label>Price (₹)</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input type="number" className="form-control" name="servingSize"
                      value={productData.servingSize} onChange={handleOnChange} />
                    <label>Serving Size</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input type="number" className="form-control" name="discount"
                      value={productData.discount} onChange={handleOnChange} />
                    <label>Discount (%)</label>
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="form-floating mb-3">
                <input type="number" className="form-control" name="stock"
                  value={productData.stock} onChange={handleOnChange} />
                <label>Stock</label>
              </div>

              {/* Availability */}
              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" id="availableNow"
                  name="isAvailable" checked={productData.isAvailable}
                  onChange={handleOnChange} />
                <label className="form-check-label" htmlFor="availableNow">
                  Available Now
                </label>
              </div>

              <button type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold rounded-pill shadow-sm" >
                {productId ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </FormSpinnerWrapper>
    </div>
  );
}

export default ProductForm;