import { Typography } from "@mui/material";

const ProductTitle = ({ children }) => {
    return (
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
            {children}
        </Typography>
    );
};

export default ProductTitle;