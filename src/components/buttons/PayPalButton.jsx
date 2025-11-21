import { usePaypalFlow } from "../../hooks/usePaypalFlow";
import PaymentButton from "./PaymentButton";

const PayPalButton = () => {
    const { startFlow, status, orderId } = usePaypalFlow();
    return (
        <PaymentButton
            label='PayPal'
            logo='logos/paypal.svg'
            bgcolor="#FFC439"
            color='#111'
            onClick={startFlow}
        />
    );
};

export default PayPalButton;