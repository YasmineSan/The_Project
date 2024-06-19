import React from 'react'
import CarouselBanner from '../components/home/CarouselBanner'
import { ShowArticlesSection } from '../components/home/ShowArticlesSection'
import { JoinUsBanner } from '../components/home/JoinUsBanner'


const Home = () => {
  return (
    <main className='mt-24 mx-auto py-4'>
      <CarouselBanner/>
      <ShowArticlesSection/>
      <JoinUsBanner/>
    </main>
  )
}
 export default Home