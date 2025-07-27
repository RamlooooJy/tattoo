import { Header } from 'components/Header/Header'
import type { FC } from 'react'
import { fetchCourses } from '../store/course.store'
import { CoursesProvider } from 'contexts/courses'
import { AppPreload } from 'components/Version/AppPreload'
import { MainProvider } from '../contexts/mainProvider'
import { Hero } from 'sections/Hero1'
import Contacts from 'sections/Contacts13'
import Price from 'sections/Price6'

const Home: FC = async () => {
  const courses = await fetchCourses()

  return (
    <MainProvider>
      <CoursesProvider courses={courses}>
        <Header />
        <Hero />
        {/*<Info />*/}
        {/*<Course />*/}
        {/*<Program />*/}
        {/*<Result />*/}
        <Price />
        {/*<AfterCourse />*/}
        {/*<Diploma />*/}
        {/*<Reserve />*/}
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
