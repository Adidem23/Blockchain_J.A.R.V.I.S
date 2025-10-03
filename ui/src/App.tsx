import './App.css'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from '@/components/theme-provider'
import Landing from '@/pages/Landing'


function App() {

  return (
    <ThemeProvider>
      <ReactLenis root options={
        {
          lerp: 0.05,
          syncTouch: true,
        }
      }>
        <Landing/>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App
