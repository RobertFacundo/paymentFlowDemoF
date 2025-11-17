import { Typography } from "@mui/material";

const InfoPanelTitle = ({ title }) => {
    return (
        <Typography variant="h5" fontWeight='bold' sx={{ mb: 2 }}>
            {title}
        </Typography>
    );
};
export default InfoPanelTitle;