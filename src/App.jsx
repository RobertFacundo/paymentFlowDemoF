import { Container, Box } from '@mui/material';
import CartLayout from './layouts/CartLayout';
import Header from './layouts/Header'
import InfoPanelLayout from './layouts/InfoPanelLayout';
import PaymentButtonsLayout from './layouts/PaymentButtonsLayout';

function App() {

  return (
    <Container maxWidth={false} sx={{px: 4, overflow: 'hidden', height: '100vh' }}>
      <Header />
      <Box sx={{mt: 1, display: 'flex', gap: 5, height: "100%" }}>
        <Box sx={{ flex: '0 0 33%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CartLayout />
          <PaymentButtonsLayout />
        </Box>
        <InfoPanelLayout />
      </Box>
    </Container>
  )
}

export default App
