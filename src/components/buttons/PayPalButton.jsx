import PaymentButton from "./PaymentButton";

const PayPalButton = () => {
    return (
        <PaymentButton
            label='PayPal'
            logo='logos/paypal.svg'
            bgcolor="#FFC439"
            color='#111'
            onClick={() => console.log('PayPal flow started')}
        />
    );
};

export default PayPalButton;