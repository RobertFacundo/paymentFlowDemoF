import { Box } from '@mui/material';
import InfoPanel from '../components/info/InfoPanel';
import InfoStepList from '../components/info/InfoStepList';
import InfoStepItem from '../components/info/InfoStepItem';
import InfoPanelTitle from '../components/info/InfoPanelTitle';

const InfoPanelLayout = () => {
    return (
        <Box sx={{ width: '90%', height: '90%', p: 2, ml: 5}}>
            <InfoPanel sx={{ height: '100%' }}>
                <InfoPanelTitle title='Choose a method' />
                <InfoStepList>
                    <InfoStepItem text='Select a payment gateway to begin the technical flow...' />
                    {/* {steps.length === 0 ? (
                        <InfoStepItem text="Select a payment gateway to begin the technical flow..." />
                    ) : (
                        steps.map((s, i) => (
                            <InfoStepItem key={i} text={s} />
                        ))
                    )} */}
                </InfoStepList>
            </InfoPanel>
        </Box>
    )
};

export default InfoPanelLayout;