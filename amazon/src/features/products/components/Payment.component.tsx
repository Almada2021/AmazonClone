import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { FormEvent, useEffect, useState } from 'react';
import { resetCart } from '../productSlice';
import axios from 'axios';
const PaymentComponent = () => {
  const { cart } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (totalQty === 0) return;
    if (paymentStatus !== 'succeded') return;
    dispatch(resetCart());
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalQty === 0) return;
    if (!stripe || !elements) return;
    const cardEl = elements.getElement(CardElement);
    setIsProcessing(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, {
        cart,
      });
      const { client_secret: client_secret } = res.data;
      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardEl!,
        },
      });
      if (!paymentIntent) {
        setPaymentStatus('Payment Failed');
      } else {
        setPaymentStatus(paymentIntent.status);
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Payment Failed');
    }
    setIsProcessing(false);
  };
  return (
    <div style={{ fontSize: '20px' }}>
      <form onSubmit={handleSubmit} id="payment-form" style={{backgroundColor:"#fff", display: "flex", flexDirection:"column", height:"100%"}}>
        <label htmlFor="card-element"></label>
        <CardElement id="card-element" ></CardElement>
        {!isProcessing && (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(resetCart());
            }}
            style={{
              marginTop: '16px',
              height: '31px',
              backgroundColor: '3f0c14b',
              color: 'black',
              display: 'flex',
              fontWeight: 600,
              fontSize: '20px',
              padding: '24px',
              justifyContent: 'center',
              alignContent: 'center',
              cursor: 'pointer',
              width: '20%',
            }}
          >
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>{paymentStatus}</div>}
      </form>
    </div>
  );
};

const PaymentGateway = () => {
  const stripePromise = loadStripe(
    'pk_test_51LIJX5DpuPBObsFmtbYLZ3WUlcyxP0sdz1Qms2p8mNzdujtgt1WJ1BJEFLlhFNXsEjKmFCYR8S1XJEdWdcdfReZr002WReCRkj',
  );
  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};
export default PaymentGateway;
