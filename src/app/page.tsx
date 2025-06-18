import { Header } from 'components/Header/Header'
import { Info } from '../sections/Info2'
import { Course } from '../sections/Course3'
import Price from '../sections/Price6'
import { Result } from '../sections/Result5'
import AfterCourse from '../sections/AfterCourse7'
import Diploma from '../sections/Diploma8'
import Reserve from '../sections/Reserve10'
import Contacts from '../sections/Contacts13'
import type { FC } from 'react'
import { fetchCourses } from '../store/course.store'
import { CoursesProvider } from 'contexts/courses'
import { Hero } from '../sections/Hero1'
import { AppPreload } from 'components/Version/AppPreload'
import { MainProvider } from '../contexts/mainProvider'
import { Program } from 'sections/Program4'

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
        <Reserve />
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
