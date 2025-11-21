import { Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { usePayPalLogic } from "../../hooks/usePaypalLogic";

const PayPalButtonWrapper = () => {
    const {
        paypalOrderId,
        handleCreateOrder,
        handleApprove,
        handleError
    } = usePayPalLogic();

    if (!paypalOrderId) return null;

    return (
        <Box sx={{ mt: 3 }}>
            <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: 'USD'
                }}
            >
                <PayPalButtons
                    createOrder={handleCreateOrder}
                    onApprove={handleApprove}
                    onError={handleError}
                />
            </PayPalScriptProvider>
        </Box>
    )
};

export default PayPalButtonWrapper;