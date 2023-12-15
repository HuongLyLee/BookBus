import React from 'react';
import Introduce from './introduce/Introduce';
import PopularRoutes from './popular-routes/PopularRoutes';
import TripSearch from './trip-search/TripSearch';

const Home = () => {
  return (
    <div className='pb-[220px]'>
        <TripSearch />
        <PopularRoutes />
        <Introduce />
    </div>
  )
}

export default Home