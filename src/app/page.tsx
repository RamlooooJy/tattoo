import { Header } from 'components/Header/Header'
import { Info } from '../sections/Info2'
import { Course } from '../sections/Course3'
import { Program } from '../sections/Program4'
import Price from '../sections/Price6'
import { Result } from '../sections/Result5'
import AfterCourse from '../sections/AfterCourse7'
import Diploma from '../sections/Diploma8'
import Reviews from '../sections/Reviews9'
import Reserve from '../sections/Reserve10'
import About from '../sections/About11'
import Questions from '../sections/Questions12'
import Contacts from '../sections/Contacts13'
import type { FC } from 'react'
import { fetchCourses } from '../store/course.store'
import { CoursesProvider } from 'contexts/courses'
import { Hero } from '../sections/Hero1'
import { AppPreload } from 'components/Version/AppPreload'
import { MainProvider } from '../contexts/mainProvider'

const Home: FC = async () => {
  const courses = await fetchCourses()

  return (
    <MainProvider>
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
    </MainProvider>
  )
}

export default Home
