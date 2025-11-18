import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import InfoPanel from '../components/info/InfoPanel';
import InfoStepList from '../components/info/InfoStepList';
import InfoStepItem from '../components/info/InfoStepItem';
import InfoPanelTitle from '../components/info/InfoPanelTitle';

const InfoPanelLayout = () => {
    const steps = useSelector(state => state.logs.steps)

    return (
        <Box sx={{ width: '90%', height: '90%', p: 2, ml: 5, overflowX: 'hidden' }}>
            <InfoPanel sx={{ height: '100%' }}>
                <InfoPanelTitle title='Logs' />
                <InfoStepList>
                    {steps.length === 0 ? (
                        <InfoStepItem
                            time="--:--:--"
                            type="front"
                            message="Select a payment gateway to begin the technical flow..."
                        />
                    ) : (
                        steps.map((step, i) => (
                            <InfoStepItem key={i} time={step.time} type={step.type} message={step.message} />
                        ))
                    )}
                </InfoStepList>
            </InfoPanel>
        </Box>
    )
};

export default InfoPanelLayout;