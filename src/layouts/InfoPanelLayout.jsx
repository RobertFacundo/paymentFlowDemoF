import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import InfoPanel from '../components/info/InfoPanel';
import InfoStepList from '../components/info/InfoStepList';
import InfoStepItem from '../components/info/InfoStepItem';
import InfoPanelTitle from '../components/info/InfoPanelTitle';
import StripeCardStep from '../components/stripe/StripeCardStep';
import { Wallet } from '@mercadopago/sdk-react';
import PayPalButtonWrapper from '../components/paypal/PayPalButtonWrapper';

const InfoPanelLayout = () => {
    const steps = useSelector(state => state.logs.steps);
    const clientSecret = useSelector(state => state.payment.clientSecret)
    const paymentStatus = useSelector(state => state.payment.paymentStatus)
    const preferenceId = useSelector(state => state.mercadoPago.preferenceId);
    const paypalOrderId = useSelector(state => state.paypal.orderId);

    return (
        <Box sx={{ flex: 1, height: '80%', overflowX: 'hidden', pl: 3, m: 2 }}>
            <InfoPanel >
                <InfoPanelTitle title='Logs' />
                <InfoStepList>
                    {steps.length === 0 ? (
                        <InfoStepItem
                            time="--:--:--"
                            type="flow"
                            message="Select a payment gateway to begin the technical flow..."
                        />
                    ) : (
                        steps.map((step, i) => (
                            <InfoStepItem key={i} time={step.time} type={step.type} message={step.message} />
                        ))
                    )}
                    { }
                </InfoStepList>
                {!paypalOrderId && !preferenceId && clientSecret && paymentStatus !== 'succeeded' && (
                    <StripeCardStep />
                )}
                {!paypalOrderId && preferenceId && (
                    <Box sx={{ mt: 3 }}>
                        <Wallet initialization={{ preferenceId }} />
                    </Box>
                )}
                {paypalOrderId && <PayPalButtonWrapper />}
            </InfoPanel>
        </Box>
    )
};

export default InfoPanelLayout;