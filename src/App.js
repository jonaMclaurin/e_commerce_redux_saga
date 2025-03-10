import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShowPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { connect } from 'react-redux'

import { selectCurrentUser }from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component'
import { checkUserSession } from './redux/user/user.actions'
 
class App extends React.Component {

        unsubscribreFromAuth = null

      componentDidMount() {
        const { checkUserSession } = this.props
        checkUserSession()
      }

      componentWillUnmount() {
        this.unsubscribreFromAuth()
      }

    render() 
      

      {
        return (
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route  path='/shop' component={ShowPage} />
            <Route  exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={()=> this.props.currentUser ? <Redirect to='/'/> : <SignInAndSignUpPage/> }  />
          </Switch>
        </div>
      );
    }
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  
})

const mapDispatchToProps = dispatch =>({
  checkUserSession: ()=> dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
