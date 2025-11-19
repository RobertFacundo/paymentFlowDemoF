import { CardElement } from "@stripe/react-stripe-js";
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useStripeCard } from "../../hooks/useStripeCard";

const StripeCardStep = () => {
    const { loading, errorMessage, confirmCardPayment } = useStripeCard();

    return (
        <Box
            sx={{
                mt: 3,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#fafafa"
            }}
        >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Enter your card details:
            </Typography>
            <Box sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                background: "white"
            }}>
                <CardElement options={{ hidePostalCode: true }} />
            </Box>

            {errorMessage && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {errorMessage}
                </Typography>
            )}

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={confirmCardPayment}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    'Confirm Payment'
                )}
            </Button>
        </Box>
    )
};

export default StripeCardStep;