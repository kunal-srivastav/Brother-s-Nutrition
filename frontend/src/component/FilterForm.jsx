import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FilterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState("");
  const [range, setRange] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [rating, setRating] = useState("");

  // Apply filters (for category & price)
  const applyFilters = () => {
    const params = new URLSearchParams(location.search);
    if (category) params.set("category", category); else params.delete("category");
    if (range) params.set("price", `0-${range}`); else params.delete("price");
    navigate(`/collection?${params.toString()}`);
  };

  // Live update filters (for brand & rating)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (brand !== "All Brands") params.set("brand", brand); else params.delete("brand");
    if (rating) params.set("rating", rating); else params.delete("rating");
    navigate(`/collection?${params.toString()}`);
  }, [brand, rating]);

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold mb-3">Filters</h5>

      {/* Category */}
      <div className="mb-3">
        <h6 className="fw-semibold">Category</h6>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)} >
            
          <option value="">Choose a Category</option>
          <option value="BCAA">BCAA</option>
          <option value="Creatine">Creatine</option>
          <option value="Fat Burner">Fat Burner</option>
          <option value="Protein">Protein</option>
          <option value="Pre-Workout">Pre-Workout</option>
          <option value="Multivitamins">Multivitamins</option>
          <option value="Omega-3">Omega-3</option>
          <option value="Weight-Gainer">Weight-Gainer</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-3">
        <h6 className="fw-semibold">Price Range</h6>
        <input type="range" value={range}
          onChange={(e) => setRange(e.target.value)}
          className="form-range" min="500" max="10000" step="100" />
        <div className="d-flex justify-content-between small">
          <span>₹500</span>
          <span>₹10000</span>
        </div>
        {range && <small>Selected: ₹{range}</small>}
      </div>

      {/* Brand (live update) */}
      <div className="mb-3">
        <h6 className="fw-semibold">Brand</h6>
        <select
          className="form-select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option>All Brands</option>
          <option>MuscleBlaze</option>
          <option>ON</option>
          <option>GNC</option>
        </select>
      </div>

      {/* Rating (live update) */}
      <div className="mb-3">
        <h6 className="fw-semibold">Ratings</h6>
        <div className="form-check">
          <input className="form-check-input" value={4}
            checked={rating === "4"}
            onChange={(e) => setRating(e.target.value)} type="radio"
            name="rating" id="4star" />
          <label className="form-check-label" htmlFor="4star">
            4<span style={{ color: "#FFD700" }}>★</span> & above
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" value={3}
            checked={rating === "3"}
            onChange={(e) => setRating(e.target.value)} type="radio"
            name="rating" id="3star" />
          <label className="form-check-label" htmlFor="3star">
            3<span style={{ color: "#FFD700" }}>★</span> & above
          </label>
        </div>
      </div>

      {/* Apply Button */}
      <button className="btn btn-warning w-100 mt-2"
        onClick={applyFilters} data-bs-dismiss="offcanvas">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterForm;