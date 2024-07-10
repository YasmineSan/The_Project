import React from 'react'
import CarouselBanner from '../components/home/CarouselBanner'
import { ShowArticlesSection } from '../components/home/ShowArticlesSection'
import { JoinUsBanner } from '../components/home/JoinUsBanner'
import { CategorySection } from '../components/home/CategorySection'


const Home = () => {
  return (
    <main className='mt-20 mx-auto py-4 bg-gray-100'>
      <CarouselBanner/>
      <ShowArticlesSection/>
      <JoinUsBanner/>
      <CategorySection/>
    </main>
  )
}
 export default Home