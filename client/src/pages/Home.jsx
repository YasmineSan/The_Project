import React from 'react'
import { CarouselBanner } from '../components/home/CarouselBanner'
import { ShowArticlesSection } from '../components/home/ShowArticlesSection'


const Home = () => {
  return ( <div className='container mt-24 mx-auto px-12 py-4'>
    <CarouselBanner/>
    <ShowArticlesSection/>
  </div>
    
    
  )
}
 export default Home