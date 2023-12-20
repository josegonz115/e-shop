import mongoose from "mongoose";

export interface product {
    _id:string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    createdAt:string;
    reviews:review[];
    updatedAt:string;
    user:string;
    __v: number;
}
export interface productsPages{
    products: product[];
    page: number;
    pages: number;
};
export interface review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    user: string; 
    createdAt?: string;
    updatedAt?: string;
}

export interface CartItem extends product{
    qty:number;
}
export interface shippingAddress {
    address:string;
    city:string;
    postalCode:string;
    country:string;
}
export interface CartState {
    cartItems: CartItem[];
    shippingAddress: shippingAddress;
    paymentMethod: 'PayPal';
    itemsPrice?:number;
    shippingPrice?:number;
    taxPrice?:number;
    totalPrice?:number;
}


export interface AuthState{
    userInfo:{
        _id:string;
        name:string;
        email:string;
        isAdmin:boolean;
        password:string;
    } | null;
}

export interface RootState{
    cart : CartState;
    auth : AuthState;
}

export interface user {
    _id:string;
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
    __v:number;
    createdAt:string;
    updatedAt:string;
}
export interface paymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
}
export interface orderItem{
    _id:string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: product; //referencing product ??? string or product
}
// export interface order{
//     _id: string;
//     user: string;
//     orderItems: orderItem[];
//     shippingAddress: shippingAddress;
//     paymentMethod: string;
//     paymentResult?: paymentResult;
//     itemsPrice: number;
//     taxPrice: number;
//     totalPrice: number;
//     isPaid: boolean;
//     paidAt?: string;
//     isDelivered: boolean;
//     deliveredAt?: string;
// }
export interface order{
    _id: string;
    user:user;
    orderItems: orderItem[];
    shippingAddress: shippingAddress;
    paymentMethod: string;
    paymentResult?: paymentResult;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt:string;
    updatedAt:string;
}
export interface paypalOrder{
    clientId:string;
    details: {
        payer: object;
    };
};
// await payOrder({ _id, details: { payer: {} } });


// models/orderModel.ts
export interface IOrderItem {
    _id: mongoose.Types.ObjectId;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: mongoose.Types.ObjectId;
}
export interface IShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
export interface IPaymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
}
export interface IOrder extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentResult?: IPaymentResult;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt:Date;
    updatedAt:Date;
}

// models/productModel.ts
export interface IReview extends mongoose.Document{
    name: string;
    rating: number;
    comment: string;
    user: mongoose.Schema.Types.ObjectId;
    createdAt?: Date; 
    updatedAt?: Date; 
}
export interface IProduct extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    reviews: IReview[];
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    createdAt: Date; 
    updatedAt: Date; 
    __v?: number; 
}

// models/userModel.ts


export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId; 
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface paypalType {
    orderId:string;
    clientId: string;
    currency:string;
};


// import { EnhancedStore, configureStore, combineReducers } from '@reduxjs/toolkit';
// import { apiSlice } from './slices/apiSlice';
// import cartSliceReducer, { CartState } from './slices/cartSlice';
// import authSliceReducer, { AuthState } from './slices/authSlice';

// export interface RootState {
//   [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
//   cart: CartState;
//   auth: AuthState;
// }

// const rootReducer = combineReducers<RootState>({
//   [apiSlice.reducerPath]: apiSlice.reducer,
//   cart: cartSliceReducer,
//   auth: authSliceReducer,
// });

// const store: EnhancedStore = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// export default store;