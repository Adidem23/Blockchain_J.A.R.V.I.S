import { Features } from '@/components/blocks/features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { HeroSectionDemo } from '@/components/Hero'
import Navbar from '@/components/Navbar'
import TestimonialsSection from '@/components/TestimonialsSection'

const Landing = () => {
  return (
    <div>
        <Navbar/>
        <HeroSectionDemo/>
        <Features/>
        <TestimonialsSection/>
        <CTA/>
        <Footer/>
    </div>
  )
}

export default Landing