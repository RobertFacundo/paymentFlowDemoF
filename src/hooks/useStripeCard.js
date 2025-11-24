import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLog } from "../redux/slices/logSlice";
import { setPaymentStatus } from '../redux/slices/stripeSlice'

export const useStripeCard = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const clientSecret = useSelector(state => state.payment.clientSecret);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const confirmCardPayment = async () => {
        if (!stripe || !elements) {
            dispatch(addLog({
                type: 'front',
                tKey: "logs.stripe.card_loading",
            }))
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        dispatch(addLog({
            type: 'front',
            tKey: 'logs.stripe.sending_card'
        }));

        const cardElement = elements.getElement(CardElement);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement
            }
        });

        if (result.error) {
            dispatch(addLog({
                type: 'backend',
                tKey: 'logs.stripe.card_failed',
                params: { error: result.error.message }
            }));

            setErrorMessage(result.error.message);
            setLoading(false);
            return;
        }

        dispatch(setPaymentStatus(result.paymentIntent.status));

        dispatch(addLog({
            type: 'backend',
            tKey: 'logs.stripe.card_succeeded',
            params: { id: result.paymentIntent.id }
        }));

        setLoading(false);
    }

    return {
        loading,
        errorMessage,
        confirmCardPayment
    }
}