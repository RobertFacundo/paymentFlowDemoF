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

    const startStripeFlow = () => {
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