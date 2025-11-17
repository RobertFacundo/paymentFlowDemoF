import PaymentButton from "./PaymentButton";

const StripeButton = () => {
    return (
        <PaymentButton
            label='Stripe'
            logo='/logos/stripe!.svg'
            bgcolor="#635BFF"
            color="#fff"
            onClick={() => console.log('stripe flow started')}
        />
    );
};

export default StripeButton;