import { Button } from '@/components/ui/button'
import { AudioLines } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home')

    const navItems = [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'features', label: 'Features', href: '#features' },
        { id: 'reviews', label: 'Reviews', href: '#reviews' },
        { id: 'contact', label: 'Contact', href: '#contact' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id))
            const scrollPosition = window.scrollY + 100

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className=' flex flex-row justify-between items-center px-10 py-1'>
            <div className=' flex flex-row gap-1'>
                <AudioLines/>
                <h1 className=' text-xl font-serif'>Jarvis AI</h1>
            </div>
            <div className=' flex flex-row justify-between border rounded-full gap-2 h-full px-1 py-2'>
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setActiveSection(item.id)}
                        className={`font-serif rounded-full px-3 py-1 transition-all duration-300 ease-in-out ${
                            activeSection === item.id
                                ? 'bg-white text-black'
                                : 'text-white hover:text-black hover:bg-gray-100'
                        }`}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
            <div>
                <a href='http://localhost:3000'><Button variant='secondary'>
                    Get Started
                </Button></a>
            </div>
        </div>
    )
}

export default Navbar