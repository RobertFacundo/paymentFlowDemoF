import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TranslateOutlined } from "@mui/icons-material";

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const toggleLng = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Chip
            icon={<TranslateOutlined />}
            label=''
            onClick={toggleLng}
            clickable
            sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: "JetBrains Mono, monospace",
                borderRadius: 1,
                px: 1,
                borderColor: "grey.400",
                backgroundColor: "transparent",
                "& .MuiChip-label": {
                    paddingRight: 1,   // quita el padding interno del label
                    paddingLeft: 0,
                },
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.06)"
                }
            }}
            variant="outlined"
        />
    )
};

export default LanguageToggle;