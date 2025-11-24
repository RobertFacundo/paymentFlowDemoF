import { Box, Typography } from '@mui/material';
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant='h4' fontWeight='bold'>
                {t('header.title')}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' sx={{ fontStyle: 'italic', letterSpacing: 0.5 }}>
                {t('header.subtitle')}
            </Typography>
            <LanguageToggle />
        </Box>
    )
};

export default Header;