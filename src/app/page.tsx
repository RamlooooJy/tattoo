import { Header } from 'components/Header/Header'
import { Info } from 'blocks/Info2'
import { Course } from 'blocks/Course3'
import { Program } from 'blocks/Program4'
import Price from '../blocks/Price6'
import { Result } from 'blocks/Result5'
import AfterCourse from 'blocks/AfterCourse7'
import Diploma from 'blocks/Diploma8'
import Reviews from 'blocks/Reviews9'
import Reserve from 'blocks/Reserve10'
import About from 'blocks/About11'
import Questions from 'blocks/Questions12'
import Contacts from 'blocks/Contacts13'
import type { FC } from 'react'
import { fetchCourses } from '../store/course.store'
import { CoursesProvider } from 'contexts/courses'
import { Hero } from 'blocks/Hero1'
import { AppPreload } from 'components/Version/AppPreload'

const Home: FC = async () => {
  const courses = await fetchCourses()

  return (
    <CoursesProvider courses={courses}>
      <Header />
      <Hero />
      <Info />
      <Course />
      <Program />
      <Result />
      <Price />
      <AfterCourse />
      <Diploma />
      <Reviews />
      <Reserve />
      <About />
      <Questions />
      <Contacts />
      {/**
       * extra
       * */}
      <AppPreload />
      {/**
       * extra
       * */}
    </CoursesProvider>
  )
}

export default Home
