import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H9nTEG6XFsLbYbYQIoRUSK6vDBrjfDdFlrpvzveXNXHLYl5uzTqk5YhIen3vPulib1oFbEuWilzPwWv5o96dOL000EoqgHq1M'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')

    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )

}

export default StripeCheckoutButton