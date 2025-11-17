import { Container, Box } from '@mui/material';
import CartLayout from './layouts/CartLayout';
import Header from './layouts/Header'
import InfoPanelLayout from './layouts/InfoPanelLayout';
import PaymentButtonsLayout from './layouts/PaymentButtonsLayout';

function App() {

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: 4 }}>
      <Header />
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: '0 0 33%', display: 'flex', flexDirection: 'column', }}>
          <CartLayout />
          <PaymentButtonsLayout />
        </Box>
        <Box sx={{ flex: '1' }}>
          <InfoPanelLayout />
        </Box>
      </Box>
    </Container>
  )
}

export default App
