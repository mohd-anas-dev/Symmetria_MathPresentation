import React from 'react'
import HomePage from './WebPages/HomePage'
import { Route, Routes } from 'react-router-dom'
import GroupTheory from './WebPages/GroupTheory'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Combinatorics from './WebPages/Combinatorics'
import GraphTheory from './WebPages/GraphTheory'
import Z7Group from './WebPages/Z7Group'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Transitions from './Components/Transitions'
import Footer from './Components/Footer'

const App = () => {
  const myLocation = useLocation()
  useGSAP(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 5,
      effects: true,
      smoothTouch: 0.1,
    })
    return () => smoother.kill()
  }, [])
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <AnimatePresence mode='wait' location={myLocation} key={myLocation.pathname}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/grouptheory" element={<GroupTheory />} />
              <Route path="/combinatorics" element={<Combinatorics />} />
              <Route path="/graphtheory" element={<GraphTheory />} />
              <Route path="/z7group" element={<Z7Group />} />
            </Routes>
            <Footer/>
          </AnimatePresence>
        </div>
      </div>

    </>
  )
}

// const WrappedApp = Transitions(App)
export default App




