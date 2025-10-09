import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonHomePage = ({ productCount = 10, categoryCount = 6 }) => {
  return (
    <SkeletonTheme baseColor="#e6e6e6" highlightColor="#f5f5f5">
      <div className="py-2">

        {/* 🎞 Banner / Carousel */}
        <div className="mb-4">
          <Skeleton height={300} borderRadius={12} />
        </div>

        {/* 🧭 Category Slider */}
        <div className="d-flex justify-content-evenly overflow-auto gap-3 py-2 mb-5 px-2">
          {Array.from({ length: categoryCount }).map((_, index) => (
            <div
              key={index}
              className="text-center flex-shrink-0"
              style={{ width: 70 }}
            >
              <Skeleton circle height={70} width={70} style={{ margin: "0 auto" }} />
              <Skeleton height={15} width={60} style={{ marginTop: 8, marginLeft: "auto", marginRight: "auto" }} />
            </div>
          ))}
        </div>

        {/* 🧱 Product Grid */}
        <div className="row g-2 g-sm-3 g-md-4 row-cols-2 row-cols-md-3 row-cols-lg-5 bg-body-tertiary p-2 mb-5 rounded">
          {Array.from({ length: productCount }).map((_, index) => (
            <div className="col mb-3" key={index}>
              <div className="card border-0 shadow-sm rounded p-2 h-100">
                <Skeleton height={160} borderRadius={10} className="mb-2" />
                <Skeleton height={18} width="80%" className="mb-2" />
                <Skeleton height={16} width="60%" className="mb-2" />
                <Skeleton height={30} width="50%" borderRadius={20} />
              </div>
            </div>
          ))}
        </div>

        {/* 🏷 Best Offers */}
        <div className="mb-2">
          <div className="d-flex overflow-auto gap-3 pb-3 px-2 bg-body-tertiary rounded">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 shadow-sm rounded bg-white p-2"
                style={{ minWidth: "200px", maxWidth: "200px" }}
              >
                <Skeleton height={160} borderRadius={8} className="mb-2" />
                <Skeleton height={18} width="90%" className="mb-1" />
                <Skeleton height={18} width="70%" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </SkeletonTheme>
  );
};

export default SkeletonHomePage;
