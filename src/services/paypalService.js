import axiosInstance from '../config/axiosConfig';

export const createPayPalOrder = async (payload) => {
    const response = await axiosInstance.post('/paypal/create-order', { amount: payload.amount });

    return response.data;
}

export const capturePayPalOrder = async (orderId) => {
    const response = await axiosInstance.post('/paypal/capture-order', {
        orderId
    });

    response.data;
}