import { Button, Box } from '@mui/material';

const PaymentButton = ({ label, logo, bgcolor, color, onClick }) => {
    return (
        <Button
            fullWidth
            variant='contained'
            onClick={onClick}
            sx={{
                maxWidth: 800,
                width: '100%',
                bgcolor,
                color,
                textTransform: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 6,
                "&:hover": {
                    opacity: 0.9,
                    bgcolor,
                }
            }}
        >
            {logo && (
                <Box
                    component='img'
                    src={logo}
                    alt='logo'
                    sx={{ width: { xs: 40, sm: 60, md: 80 }, height: { xs: 40, sm: 60, md: 80 } }}
                />
            )}
            {label}
        </Button>
    );
};

export default PaymentButton;