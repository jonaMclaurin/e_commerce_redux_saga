import React from 'react'
import './sign-in-and-sign-up.component.scss'
import SigIn from '../../components/sing-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

const SignInAndSignUpPage = () => {
    return(
        <div className='sign-in-and-sign-up'>
        <SigIn/>
        <SignUp/>
        </div>
    )
}

export default SignInAndSignUpPage
