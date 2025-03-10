import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-imput.component'
import CustomButton from '../custom-button/custom-button.component'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

class SigIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }


    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props
        const { email, password } = this.state;
        emailSignInStart(email, password)
    }
 

    handleChange = event => {
       const { value, name } = event.target;
        this.setState({[name]: value})
    }

    render() {
        const { googleSignInStart } = this.props

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password </span>

                <form onSubmit={this.handleSubmit} >
                    <FormInput 
                        name='email' 
                        type='email' 
                        handleChange={this.handleChange} 
                        value={this.state.email} 
                        label='Email'
                        required />
                    
                    
                    <FormInput name='password' 
                        type='password' 
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label='Password'
                        required />
                
                    <div className='buttons'>
                    <CustomButton type='submit' > SIGN IN </CustomButton>
                    <CustomButton type="button"  onClick={ googleSignInStart } isGoogleSignIn> 
                    {' '}
                    Sign in with google{' '}  
                    </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SigIn);