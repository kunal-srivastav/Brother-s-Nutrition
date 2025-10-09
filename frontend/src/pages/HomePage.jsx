import React from 'react';
const Home = React.lazy(() => import('../component/Home'));
const LatestCollection = React.lazy(() => import('../component/LatestCollection'));
const BestSeller = React.lazy(() => import ('../component/BestSeller'));

function HomePage() {

  return (
    <>
      <Home />
      <LatestCollection />
      <BestSeller />
    </>
  )
}

export default HomePage