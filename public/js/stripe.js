import axios from "axios"
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51JF2IPD4rD0axeCFNWLiWJx8b1rN3mmmiRWkc7ADGRbxGRpaP5A51dRRqdQKph3BqDukS6i6n08jqfWNHSZy6p3p001PB8u31E')

export const bookTour = async tourId => {

  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  }catch(err) {
    console.log(err)
    showAlert('error', err)
  }
}