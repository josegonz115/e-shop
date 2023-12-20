import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { order, paypalType } from "../types/interfaces";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: { ...order },
            }),
        }),
        getOrderDetails: builder.query<order, string>({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        // payOrder: builder.mutation<paypalOrder, Partial<paypalOrder> & Pick<paypalOrder, 'clientId'>>({
        //     query: ({clientId:orderId, ...details}) => ({
        //         url: `${ORDERS_URL}/${orderId}/pay`,
        //         method: 'PUT',
        //         body:{...details},
        //     }),
        // }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body: details,
            }),
        }),
        getPayPalClientId: builder.query<paypalType, void>({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query<order[], void>({
            query: () => ({
                url: `${ORDERS_URL}/myorder`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query<order[], void>({
            query: ()=>({
                url:ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation<order, string>({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
} = ordersApiSlice;
