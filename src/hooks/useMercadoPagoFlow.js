import { useDispatch, useSelector } from "react-redux";
import { startMercadoPagoFlow } from "../redux/slices/mercadoPagoSlice";

export const useMercadoPagoFlow = () => {
    const dispatch = useDispatch();
    const { status, checkoutUrl, preferenceId, paymentStatus } = useSelector(state => state.mercadoPago);

    const startFlow = () => {
        dispatch(startMercadoPagoFlow());
    }

    return {
        status,
        checkoutUrl,
        preferenceId,
        paymentStatus,
        startFlow
    };
};