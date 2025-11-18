import { Paper, Box } from '@mui/material';

const InfoPanel = ({ children }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                height: '100%',
                p: 2,
                overflowY: 'auto',
                borderRadius: 2
            }}
        >
            {children}
        </Paper>
    )
};

export default InfoPanel;