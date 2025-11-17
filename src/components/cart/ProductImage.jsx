import { Box } from '@mui/material';

const ProductImage = ({ src, alt }) => {
    return (
        <Box
            component='img'
            src={src}
            alt={alt}
            sx={{ width: 180, height: 180, borderRadius: 1, mr: 2 }}
        />
    )
}

export default ProductImage;