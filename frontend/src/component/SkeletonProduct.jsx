import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProduct = ({ count = 15 }) => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      {Array.from({ length: count }).map((_, index) => (
        <div className="col mb-3" key={index}>
          <div className="card p-2 shadow-sm rounded">
            <Skeleton height={150} borderRadius={10} />
            <Skeleton height={20} width={`80%`} style={{ marginTop: 10, borderRadius: 5 }} />
            <Skeleton height={20} width={`60%`} style={{ marginTop: 6, borderRadius: 5 }} />
            <Skeleton height={20} width={`40%`} style={{ marginTop: 8, borderRadius: 5 }} />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default SkeletonProduct;
