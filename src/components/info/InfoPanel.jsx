import { Paper, Box } from '@mui/material';

const InfoPanel = ({ children }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '95%',
                height: '90%',
                p: 2,
                mt:3,
                overflowY: 'auto',
                borderRadius: 2
            }}
        >
            {children}
        </Paper>
    )
};

export default InfoPanel;