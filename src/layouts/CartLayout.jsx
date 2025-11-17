import { Box, Typography } from '@mui/material';
import ProductCard from '../components/cart/ProductCard';

const CartLayout = () => {
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <ProductCard />
        </Box>
    );
};

export default CartLayout;