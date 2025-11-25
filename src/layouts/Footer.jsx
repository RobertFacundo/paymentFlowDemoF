import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                position: "fixed",
                bottom: 5,
                left: 0,
                py: 0,
                pl: 25,
                textAlign: "left",
                zIndex: 10,
            }}
        >
            <Typography variant="body2" sx={{ color: "#715252", letterSpacing: 1,  }}>
                Designed & developed by{" "}
                <Link
                    href="https://github.com/RobertFacundo"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ fontWeight: "bold", color: "success.light" }}
                >
                    Robert
                </Link>
            </Typography>
        </Box>
    );
}