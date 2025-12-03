import React from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import MySelf from './components/MySelf'
import Mern from './components/Mern'
import TechIUsed from './components/TechIUsed'
import DaysICode from './components/DaysICode'
import IProvideServices from './components/IProvideServices'
import Footer from './components/Footer'
import CrudProjects from './pages/CrudProjects'

function App() {
  return (
    <>
    <div id="top">
      <Header />

        
      <Intro />



      <MySelf />


      
      <Mern />


      <TechIUsed />


      <DaysICode />

      <IProvideServices />

      <CrudProjects />

      <Footer />
    

    </div>
    </>
  )
}

export default App