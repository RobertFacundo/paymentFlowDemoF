import { Box, Typography } from '@mui/material';

const Header = () => {
    return (
        <Box sx={{ textAlign: 'center', mt:2 }}>
            <Typography variant='h4' fontWeight='bold'>
                Payment Flow Demo
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' sx={{ fontStyle: 'italic', letterSpacing: 0.5 }}>
                Explore the technical flow of multiple payment gateways
            </Typography>
        </Box>
    )
};

export default Header;