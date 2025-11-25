# PaymentFlow Demo — Frontend

A professional demonstration of modern payment gateway flows, designed to showcase clean architecture, real-world integration patterns, and a scalable frontend structure using React, Vite, Redux Toolkit, custom hooks, and Material UI.

This project allows recruiters and developers to visualize how a frontend triggers a complete payment flow for Stripe, PayPal, including how data travels between files, components, and services.

The UI presents a predefined cart with a single demo product and provides payment buttons. When a payment method is selected, the Control Panel displays each technical step in real time.

---

## 🚀 Technologies Used

- **React 19

- **Vite 7

- **Material UI (MUI)

- **Redux Toolkit & react-redux

- **Custom Hooks Architecture

- **Axios + Axios Interceptors

- **Stripe SDK (@stripe/react-stripe-js)

- **PayPal SDK (@paypal/react-paypal-js)

- **Mercado Pago SDK (@mercadopago/sdk-react)

- **i18next (internationalization support)

---

## 💡 Key Features

✔ Payment Flow Visualization

- Each payment gateway shows:

- What the frontend sends

- What the backend returns

- What ID is created (intent, order, preference)

- What happens at each step of the checkout process

✔ Clean, Modular Architecture

The project uses:

- One custom hook per payment provider

- One Redux slice per flow

- Services that isolate API calls

- Centralized Axios configuration

- Fully separated UI / logic / state layers

✔ Material UI Styling

- The entire frontend is styled using MUI components:

- Responsive layouts

- Panels, buttons, containers

- Typography and theme consistency

✔ Real Payment SDKs

- Stripe Elements, PayPal Buttons, and Mercado Pago Brick (commented out for demo purposes).

✔ Preloaded Cart

- The app includes a single default product:

```json
Product: PaymentFlow Demo
Price: $0.10 USD
```
- This lets recruiters focus on the flow, not on ecommerce features.

---

## API Services

The frontend communicates with the backend using a classic service layer with Axios.
Below are the core service abstractions (summarized):

- Stripe

```js
axiosInstance.post("/payments/stripe/create-payment-intent", {
  amount: 0.50,
  currency: "usd",
  description: "Payment Gateway Experience"
});
```

- PayPal
```js
axiosInstance.post("/paypal/create-order", { amount: payload.amount });
axiosInstance.post("/paypal/capture-order", { orderId });
```

## 📂 Project Structure

```js
src/
│
├── components/         # Reusable UI components
├── layouts/            # Page and UI container layouts
│   ├── CartLayout
│   ├── PaymentButtonsLayout
│   └── InfoPanelLayout
│
├── hooks/              # One hook per payment provider
│   ├── useStripeFlow.js
│   ├── usePayPalFlow.js
│   └── useMercadoPagoFlow.js
│
├── redux/
│   ├── slices/
│   │   ├── stripeSlice.js
│   │   ├── paypalSlice.js
│   │   └── logSlice.js
│   └── store.js
│
├── services/           # API requests (each gateway in its file)
│   ├── stripeService.js
│   ├── paypalService.js
│   └── mercadoPagoService.js
│
├── config/
│   ├── axiosConfig.js  # axios baseURL + interceptors
│
└── App.jsx
```

---
## 📬 Contact

- LinkedIn: [Facundo Robert](https://www.linkedin.com/in/robertfacundodev/)
- Portfolio: [My Portfolio](https://facundorobert.vercel.app/) 
- Email: robertf.coder@gmail.com