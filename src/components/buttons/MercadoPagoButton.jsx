import PaymentButton from "./PaymentButton";

const MercadoPagoButton = () => {
    return (
        <PaymentButton
            label='Mercado Pago'
            logo='/logos/mercadoPago.svg'
            bgcolor="#00ADEF"
            color='#fff'
            onClick={() => console.log('Mercado Pago flow started')}
        />
    );
};

export default MercadoPagoButton;