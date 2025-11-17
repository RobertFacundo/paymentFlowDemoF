import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';

const ProductCard = () => {
    return (
        <Card elevation={3} sx={{ width: '100%', display: 'flex', alignItems: 'center', p: 3 }}>
            <ProductImage src='/productImage.jpg' alt='Payment Flow demo' />
            <CardContent sx={{ flex: 1, p: 4 }}>
                <ProductTitle>Payment Gateway Experience</ProductTitle>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ProductPrice amount='0.10' />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard;