import React, { Suspense } from 'react';
import SkeletonHomePage from '../component/SkeletonProduct';
const Home = React.lazy(() => import('../component/Home'));
const LatestCollection = React.lazy(() => import('../component/LatestCollection'));
const BestSeller = React.lazy(() => import ('../component/BestSeller'));

function HomePage() {

  return (
    <Suspense fallback={<SkeletonHomePage />} >
      <Home />
      <LatestCollection />
      <BestSeller />
    </Suspense>
  )
}

export default HomePage