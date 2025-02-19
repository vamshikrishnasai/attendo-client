import React from 'react'
import Nav from "./components/ui/nav"
import BarcodeScanner from './BarcodeScanner'
import Body from "./components/ui/body"
const home = () => {
  return (
    <div>
      <Nav/>
      {/* <BarcodeScanner/> */}
      <Body/>
    </div>
  )
}

export default home
