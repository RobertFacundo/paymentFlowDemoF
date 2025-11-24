import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    header: {
                        title: "Payment Flow Demo",
                        subtitle: "Explore the technical flow of multiple payment gateways"
                    },
                    logs: {
                        select_provider: "Select a payment provider to begin...",
                        mp: {
                            initializing: "Initializing Mercado Pago payment flow...",
                            preparing_data: "📦 Preparing purchase data: product=\"{{product}}\", amount=$ {{amount}} {{currency}}",
                            sending_request_backend: "📡 Sending request to backend to create Mercado Pago preference...",

                            backend_received_request:
                                "🟢 Backend received the request and contacted Mercado Pago servers to create the payment session.",

                            backend_returned_preference:
                                "🧩 Backend returned a preferenceId. This ID identifies the payment session and enables Wallet rendering.",
                            wallet_explanation: '💳 With this preferenceId, the Wallet component can securely redirect the user to Mercado Pago’s payment platform.',

                            rendering_wallet:
                                "💳 Rendering Mercado Pago Wallet. The user will be redirected to complete the payment...",

                            redirect_flow:
                                "🔄 After redirection, logs will not be visible. Final payment status is notified by webhook.",

                            webhook_step:
                                "1️⃣ Webhook → backend receives Mercado Pago notification (approved, rejected, pending).",

                            polling_step:
                                "2️⃣ Polling → frontend can check payment status after returning from checkout.",

                            error_creating_preference:
                                "❌ Error creating Mercado Pago preference: {{error}}",

                            error_possible_causes:
                                "⚠️ Possible causes: missing credentials, test user issues, card verification required, or backend misconfiguration."
                        },
                        stripe: {
                            initializing: 'User selected Stripe as payment provider → Initializing Stripe payment flow.',
                            sending_paymentIntent: "Sending PaymentIntent request to backend (amount, currency, description).",
                            request_received: 'Request received. Validating data and preparing Stripe PaymentIntent.',
                            paymentIntent_created: 'Stripe API → PaymentIntent created successfully. This represents a secure placeholder for the future payment.',
                            client_secret: `Stripe → Returned clientSecret ({{clientSecret}}). The clientSecret allows the frontend to securely confirm the payment WITHOUT exposing secret API keys.`,
                            stripe_card: 'Received the clientSecret. This value will be used by Stripe Elements to handle card details securely.',
                            mock_card: 'ℹ️ Use test card 4242 4242 4242 4242 (MM/YY in future, any CVC) for testing.',
                            card_loading: '⚠ Stripe has not finished loading. Please wait...',
                            sending_card: 'Sending card data securely to Stripe...',
                            card_failed: '❌ Stripe → Payment failed: {{error.message}}',
                            card_succeeded: "✅ Stripe → Payment succeeded! PaymentIntent: {{id}}"
                        },
                        paypal: {
                            initializing: "Initializing PayPal payment flow...",
                            preparing_data: "📦 Preparing purchase data: amount=$ {{amount}} USD",

                            sending_request_backend: "📡 Sending request to backend to create PayPal order...",
                            backend_processing: "🖥️ Backend processing request...",

                            backend_created_order: "🟢 Backend created PayPal order successfully.",
                            frontend_received_orderId:
                                "🧩 Frontend received orderId from backend: {{id}}. Ready to initialize PayPal widget.",

                            rendering_button: "🪟 Rendering PayPal checkout button...",

                            sandbox_card:
                                "💳 Use this PayPal Sandbox Test Card:\n • Card Number: 4299 1966 7020 9475\n • Expiry: 11/2030\n • CVC: Any 3 digits",

                            error_creating_order:
                                "❌ Error creating PayPal order: {{error}}",

                            // HOOK LOGS
                            sending_orderId_front:
                                "🛒 PayPal: sending orderId to PayPal Buttons...",

                            user_approved:
                                "👍 PayPal: payment approved by user, capturing...",

                            backend_captured:
                                "🟢 Backend captured PayPal order successfully.",

                            payment_succeeded:
                                "🎉 PayPal payment succeeded!",

                            capture_error:
                                "❌ Capture error: {{error}}",

                            general_error:
                                "⚠️ PayPal error: {{error}}"
                        }
                    }
                }
            },
            es: {
                translation: {
                    header: {
                        title: "Demo de Flujo de Pago",
                        subtitle: "Explora el flujo técnico de múltiples pasarelas de pago"
                    },
                    logs: {
                        select_provider: "Selecciona un proveedor de pago para comenzar...",
                        mp: {
                            initializing: "Inicializando flujo de pago de Mercado Pago...",
                            preparing_data: "📦 Preparando compra: producto=\"{{product}}\", monto=$ {{amount}} {{currency}}",
                            sending_request_backend: "📡 Enviando solicitud al backend para crear la preferencia de pago...",

                            backend_received_request:
                                "🟢 El backend recibió la solicitud y contactó a los servidores de Mercado Pago para crear la sesión de pago.",

                            backend_returned_preference:
                                "🧩 El backend devolvió un preferenceId. Este ID identifica la sesión de pago y permite renderizar Wallet.",
                            wallet_explanation: '💳 Con este preferenceId, el componente Wallet puede redirigir de forma segura al usuario a la plataforma de pago de Mercado Pago.',

                            rendering_wallet:
                                "💳 Renderizando Mercado Pago Wallet. El usuario será redirigido para completar el pago...",

                            redirect_flow:
                                "🔄 Tras la redirección, los logs no serán visibles. El estado final llega por webhook.",

                            webhook_step:
                                "1️⃣ Webhook → el backend recibe la notificación de Mercado Pago (approved, rejected, pending).",

                            polling_step:
                                "2️⃣ Polling → el frontend puede verificar el estado al volver del checkout.",

                            error_creating_preference:
                                "❌ Error al crear la preferencia de Mercado Pago: {{error}}",

                            error_possible_causes:
                                "⚠️ Posibles causas: credenciales faltantes, problemas con test users, verificación de tarjeta o errores en el backend."
                        },
                        stripe: {
                            initializing: "El usuario seleccionó Stripe como proveedor de pago → Inicializando el flujo de pago con Stripe.",
                            sending_paymentIntent: "Enviando la solicitud de PaymentIntent al backend (monto, moneda, descripción).",
                            request_received: "Solicitud recibida por el backend. Validando datos y preparando el PaymentIntent de Stripe.",
                            paymentIntent_created: "Stripe API → PaymentIntent creado exitosamente. Este paso representa un placeholder seguro para el futuro pago.",
                            client_secret: `Stripe → Devolvió el clientSecret ({{clientSecret}}). Este clientSecret permite que el frontend confirme el pago de manera segura SIN exponer claves secretas de la API.`,
                            stripe_card: "Se recibió el clientSecret. Este valor será utilizado por Stripe Elements para manejar los datos de la tarjeta de forma segura.",
                            mock_card: "ℹ️ Usa la tarjeta de prueba 4242 4242 4242 4242 (MM/AA en el futuro, cualquier CVC) para las pruebas.",
                            card_loading: '⚠ Stripe aún no terminó de cargar. Por favor, espera…',
                            sending_card: "Enviando los datos de la tarjeta de forma segura a Stripe...",
                            card_failed: "❌ Stripe → El pago falló: {{error}}",
                            card_succeeded: "✅ Stripe → ¡Pago exitoso! PaymentIntent: {{id}}"
                        },
                        paypal: {
                            initializing: "Inicializando flujo de pago con PayPal...",
                            preparing_data: "📦 Preparando compra: monto=$ {{amount}} USD",

                            sending_request_backend:
                                "📡 Enviando solicitud al backend para crear la orden de PayPal...",
                            backend_processing: "🖥️ El backend está procesando la solicitud...",

                            backend_created_order:
                                "🟢 El backend creó la orden de PayPal exitosamente.",
                            frontend_received_orderId:
                                "🧩 El frontend recibió el orderId desde el backend: {{id}}. Listo para inicializar el widget de PayPal.",

                            rendering_button: "🪟 Renderizando el botón de checkout de PayPal...",

                            sandbox_card:
                                "💳 Usa esta tarjeta de prueba de PayPal Sandbox:\n • Número: 4299 1966 7020 9475\n • Expiración: 11/2030\n • CVC: Cualquier código de 3 dígitos",

                            error_creating_order:
                                "❌ Error al crear la orden de PayPal: {{error}}",

                            // LOGS DEL HOOK
                            sending_orderId_front:
                                "🛒 PayPal: enviando orderId a los PayPal Buttons...",

                            user_approved:
                                "👍 PayPal: pago aprobado por el usuario, capturando...",

                            backend_captured:
                                "🟢 El backend capturó la orden de PayPal exitosamente.",

                            payment_succeeded:
                                "🎉 ¡Pago exitoso con PayPal!",

                            capture_error:
                                "❌ Error en la captura: {{error}}",

                            general_error:
                                "⚠️ Error de PayPal: {{error}}"
                        }
                    }
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;