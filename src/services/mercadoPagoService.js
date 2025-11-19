import axiosInstance from "../config/axiosConfig";

export const createMercadoPagoPreference = async (payload) => {
    const response = await axiosInstance.post('/payments/mercadopago/session', payload);
    return response.data;
}