import { useDispatch, useSelector } from "react-redux";
import { startStripePaymentIntent } from "../redux/slices/stripeSlice";
import { addLog } from "../redux/slices/logSlice";

export const useStripeFlow = () => {
    const dispatch = useDispatch();

    const {
        provider,
        status,
        clientSecret,
        paymentStatus
    } = useSelector(state => state.payment);

    const startStripeFlow = ()=>{
        dispatch(addLog({
            type: 'front',
            message: "User selected Stripe as payment provider → Initializing Stripe payment flow."
        }))
        dispatch(startStripePaymentIntent());
    };

    return {
        provider,
        status,
        clientSecret,
        paymentStatus,
        startStripeFlow
    }
}