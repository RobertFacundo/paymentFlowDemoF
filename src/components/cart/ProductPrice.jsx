import { Typography } from "@mui/material";

const ProductPrice = ({ amount }) => {
    return (
        <Typography variant="h5" color="success.main">
            USD {amount}
        </Typography>
    );
};

export default ProductPrice;