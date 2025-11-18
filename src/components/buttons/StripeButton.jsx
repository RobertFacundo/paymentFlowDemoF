import PaymentButton from "./PaymentButton";
import { useStripeFlow } from "../../hooks/useStripeFlow";

const StripeButton = () => {
    const { startStripeFlow } = useStripeFlow();

    return (
        <PaymentButton
            label='Stripe'
            logo='/logos/stripe!.svg'
            bgcolor="#635BFF"
            color="#fff"
            onClick={startStripeFlow}
        />
    );
};

export default StripeButton;