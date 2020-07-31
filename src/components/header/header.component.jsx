import React from 'react'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { createStructuredSelector } from 'reselect'
import { selectCartHidden }from '../../redux/cart/cart.selectors'
import { selectCurrentUser }from '../../redux/user/user.selector'
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer  } from './header.styles'
import { sigOutStart } from '../../redux/user/user.actions'

const Header= ({ currentUser, hidden, sigOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ? 
                    <OptionLink as='div' onClick={ sigOutStart }>  SIGN OUT </OptionLink>
                    :
                    <OptionLink  to='/signin'> SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null :
                 <CartDropdown />
            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({ 
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    sigOutStart: () => dispatch(sigOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);