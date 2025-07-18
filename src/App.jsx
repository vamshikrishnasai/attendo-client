import React from 'react'
import Home from "./home"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import BarcodeScanner from './BarcodeScanner'
import Signup from './components/ui/signup'
import Signin from './components/ui/signin'
import Attendies from "./components/ui/attendies"
import Body from "./components/ui/body"
import Nav from "./components/ui/nav"
import LearnMore from './components/learnmore'
import Analytics from './components/ui/analytics'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/attendies" element={<Attendies />} />
        <Route path="/learn-more" element={<LearnMore/>} />
         <Route path="/analytics" element={<Analytics/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
