import { Box } from "@mui/material";

const InfoStepList = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {children}
        </Box>
    );
};

export default InfoStepList;