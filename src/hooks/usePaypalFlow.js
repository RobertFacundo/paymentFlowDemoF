import { useDispatch, useSelector } from "react-redux";
import { startPayPalFlow } from "../redux/slices/paypalSlice";

export const usePaypalFlow = () => {
    const dispatch = useDispatch();
    const { status, orderId, paymentStatus } = useSelector(state => state.paypal);

    const startFlow = () => {
        dispatch(startPayPalFlow());
    }

    return {
        status,
        orderId,
        paymentStatus,
        startFlow
    };
}