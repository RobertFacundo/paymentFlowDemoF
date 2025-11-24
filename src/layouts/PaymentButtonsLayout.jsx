import { Box } from '@mui/material';
import StripeButton from '../components/buttons/StripeButton';
import PayPalButton from '../components/buttons/PayPalButton';
// import MercadoPagoButton from '../components/buttons/MercadoPagoButton';

const PaymentButtonsLayout = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 7,
            ml:10,
        }}>
            <StripeButton />
            <PayPalButton />
            {/* <MercadoPagoButton /> */}
        </Box>
    );
};

export default PaymentButtonsLayout;