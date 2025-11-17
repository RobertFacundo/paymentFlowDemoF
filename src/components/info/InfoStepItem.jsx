import { Box, Typography, Paper } from "@mui/material";

const InfoStepItem = ({ text }) => {
    return (
        <Paper
            elevation={1}
            sx={{ p: 2, borderRadius: 2, backgroundColor: 'grey.100' }}
        >
            <Typography variant="body1">{text}</Typography>
        </Paper>
    );
};

export default InfoStepItem;