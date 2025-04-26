import { Header } from 'components/Header/Header'
import { Hero } from 'blocks/Hero1'
import { Info } from 'blocks/Info2'
import { Course } from 'blocks/Course3'
import { Program } from 'blocks/Program4'
import Price from '../blocks/Price6'
import { Result } from 'blocks/Result5'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Info />
      <Course />
      <Program />
      <Result />
      <Price />
    </>
  )
}
