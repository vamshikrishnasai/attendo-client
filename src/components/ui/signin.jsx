import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const signin = () => {
  return (
    <div className='flex justify-center mt-8'>
      <SignIn signUpUrl='/signup'forceRedirectUrl={"/"}/>
    </div>
  )
}

export default signin
