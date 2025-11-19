import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeProvider = ({ children }) => {
    const clientSecret = useSelector(state => state.payment.clientSecret);

    if (!clientSecret) return children;

    return (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            {children}
        </Elements>
    )
};

export default StripeProvider;