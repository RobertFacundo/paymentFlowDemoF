import { Box, Typography, Paper, Chip } from "@mui/material";
import { BoltOutlined } from "@mui/icons-material";
import { StorageOutlined } from "@mui/icons-material";
import { AccessTime } from "@mui/icons-material";

const typeConfig = {
    front: {
        color: "warning",
        label: "FRONT",
        icon: <BoltOutlined fontSize="small" />
    },
    backend: {
        color: "success",
        label: "BACKEND",
        icon: <StorageOutlined fontSize="small" />
    }
}

const InfoStepItem = ({ time, type, message }) => {
    const cfg = typeConfig[type]

    return (
        <Paper
            elevation={1}
            sx={{
                p: 1,
                borderRadius: 2,
                mb: 1,
                background: "linear-gradient(to right, #fafafa, #f0f0f0)",
                borderLeft: "5px solid",
                borderColor: cfg.color + ".main",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2 }}>

                <Chip
                    icon={<AccessTime />}
                    label={time}
                    size="small"
                    variant="outlined"
                    sx={{ color: "grey.700", borderColor: "grey.400" }}
                />

                <Chip
                    icon={cfg.icon}
                    label={cfg.label}
                    color={cfg.color}
                    size="small"
                />
            </Box>
            <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{message}</Typography>
        </Paper>
    );
};

export default InfoStepItem;