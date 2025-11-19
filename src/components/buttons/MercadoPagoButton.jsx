import PaymentButton from "./PaymentButton";
import { useMercadoPagoFlow } from '../../hooks/useMercadoPagoFlow'

const MercadoPagoButton = () => {
    const { startFlow } = useMercadoPagoFlow();
    return (
        <PaymentButton
            label='Mercado Pago'
            logo='/logos/mercadoPago.svg'
            bgcolor="#00ADEF"
            color='#fff'
            onClick={startFlow}
        />
    );
};

export default MercadoPagoButton;