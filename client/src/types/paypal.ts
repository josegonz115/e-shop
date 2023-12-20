// Define the structure of the PayPal client ID response
export interface PayPalClientIdResponse {
    clientId: string;
}

// Define the structure for the payment result details from PayPal
export interface PaymentResultDetails {
    id: string;
    status: string;
    update_time: string;
    email_address?: string;
    payer?: {
        name?: {
            given_name: string;
            surname: string;
        };
        email_address: string;
        payer_id: string;
        address?: {
            country_code: string;
        };
    };
    // ... Add any other properties you expect from the PayPal payment details
}

// Define the structure for the order data to send to the payOrder mutation
export interface PayOrderParams {
    orderId: string;
    details: PaymentResultDetails;
}

// Define the structure for the PayPal purchase unit
export interface PayPalPurchaseUnit {
    amount: {
        currency_code?: string;
        value: string;
    };
}

// Define the structure for the order to create with PayPal
export interface PayPalOrderRequest {
    intent?: string; // "CAPTURE", "AUTHORIZE", etc.
    purchase_units: PayPalPurchaseUnit[];
    // ... Add any other properties you expect in a PayPal order request
}

// Define the structure for the data returned by creating a PayPal order
export interface PayPalOrderResponse {
    id: string;
    // ... Add any other properties you expect in the response from creating a PayPal order
}

// // Define the structure of your AuthState from Redux if needed
// interface AuthState {
//     // ... properties from your AuthState
// }

// // Define the structure of your Redux state if needed
// interface RootState {
//     // ... properties from your RootState
//     auth: AuthState;
// }

// // Define the structure of your order details data
// interface OrderDetails {
//     _id: string;
//     user: {
//         name: string;
//         email: string;
//         // ... Add any other user properties you need
//     };
//     shippingAddress: {
//         address: string;
//         city: string;
//         postalCode: string;
//         country: string;
//     };
//     orderItems: OrderItem[];
//     paymentMethod: string;
//     totalPrice: string;
//     isPaid: boolean;
//     isDelivered: boolean;
//     // ... Add any other order properties you need
// }

// // Define the structure of an individual order item
// interface OrderItem {
//     name: string;
//     qty: number;
//     image: string;
//     price: string;
//     product: string;
//     // ... Add any other properties you need for an order item
// }

// Define the structure of the error object if needed
export interface CustomError {
    message: string;
    status?: number;
    // ... Add any other properties you need for error handling
}
