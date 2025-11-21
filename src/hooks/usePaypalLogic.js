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
            message: "🛒 PayPal: sending orderId to PayPal Buttons..."
        }));

        return paypalOrderId;
    };

    const handleApprove = async () => {
        dispatch(addLog({
            type: "front",
            message: "👍 PayPal: payment approved by user, capturing..."
        }));

        try {
            const capture = await capturePayPalOrder(paypalOrderId);

            dispatch(addLog({
                type: "backend",
                message: "🟢 Backend captured PayPal order successfully."
            }));

            dispatch(addLog({
                type: "front",
                message: "🎉 PayPal payment succeeded!"
            }));

            dispatch(setPaymentStatus("succeeded"));

        } catch (error) {
            dispatch(addLog({
                type: "backend",
                message: `❌ Capture error: ${error.message}`
            }));

            dispatch(setPaymentStatus("failure"));
        }
    };

    const handleError = (error) => {
        dispatch(addLog({
            type: "front",
            message: `⚠️ PayPal error: ${error.message}`
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
