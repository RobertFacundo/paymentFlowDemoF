import { useDispatch, useSelector } from "react-redux";
import { setPaymentStatus } from "../redux/slices/paypalSlice";
import { addLog } from "../redux/slices/logSlice";
import { capturePayPalOrder } from "../services/paypalService";

export const usePayPalLogic = () => {
    const dispatch = useDispatch();
    const paypalOrderId = useSelector(state => state.paypal.orderId);

    const handleCreateOrder = () => {
        dispatch(addLog({
            type: "front",
            tKey: "logs.paypal.sending_orderId_front"
        }));

        return paypalOrderId;
    };

    const handleApprove = async () => {
        dispatch(addLog({
            type: "front",
            tKey: "logs.paypal.user_approved"
        }));

        try {
            const capture = await capturePayPalOrder(paypalOrderId);

            dispatch(addLog({
                type: "backend",
                tKey: "logs.paypal.backend_captured"
            }));

            dispatch(addLog({
                type: "front",
                tKey: "logs.paypal.payment_succeeded"
            }));

            dispatch(setPaymentStatus("succeeded"));

            setTimeout(() => {
                dispatch(resetPayPalState());
            }, 300);

        } catch (error) {
            dispatch(addLog({
                type: "backend",
                tKey: 'logs.paypal.capture_error',
                params: { error: error.message }
            }));

            dispatch(setPaymentStatus("failure"));
        }
    };

    const handleError = (error) => {
        dispatch(addLog({
            type: "front",
            tKey: 'logs.paypal.general_error',
            params: { error: error.message }
        }));

        dispatch(setPaymentStatus("failure"));
    };

    return {
        paypalOrderId,
        handleCreateOrder,
        handleApprove,
        handleError,
    };
};
