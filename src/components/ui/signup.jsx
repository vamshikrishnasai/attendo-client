import React from 'react'
import {  SignUp } from '@clerk/clerk-react'
const signup = () => {
  return (
    <div className='flex justify-center mt-8'>
      <SignUp signInUrl='/signin' forceRedirectUrl={"/"}/>
    </div>
  )
}

export default signup
