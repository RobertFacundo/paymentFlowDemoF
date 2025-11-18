import axiosInstance from "../config/axiosConfig";

export const createPaymentIntentRequest = async () => {
    const response = await axiosInstance.post("/payments/stripe/create-payment-intent", {
        amount: 0.50,
        currency: "usd",
        description: "Payment Gateway Experience"
    });

    return response.data;
}