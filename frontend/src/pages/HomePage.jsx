import React, { Suspense } from 'react';
const Home = React.lazy(() => import('../component/Home'));
const LatestCollection = React.lazy(() => import('../component/LatestCollection'));
const BestSeller = React.lazy(() => import ('../component/BestSeller'));

function HomePage() {

  return (
    <Suspense fallback={"Loading"}>
      <Home />
      <LatestCollection />
      <BestSeller />
    </Suspense>
  )
}

export default HomePage