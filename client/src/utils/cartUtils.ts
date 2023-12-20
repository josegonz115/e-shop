import { CartState } from "../types/interfaces";

export const addDecimals = (num:number|undefined | string):string =>{
    if(typeof num == 'string'){
        if(isNaN(parseFloat(num))){
            return 'null';
        }
        else{
            num = parseFloat(num);
        }
    }
    if(num === 0){
        return '0.00';
    }
    if(num === undefined){
        return 'null'; // could be really wrong
    }
    return (Math.round(num * 100) / 100).toFixed(2);
    //return (num ?? 0).toFixed(2);
};


export const updateCart = (state: CartState): CartState => {
    // Calculate item prices
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    state.itemsPrice = parseFloat(addDecimals(itemsPrice));

    // Calculate shipping price
    state.shippingPrice = itemsPrice > 100 ? 0 : 10;

    // Calculate tax price
    const taxPrice = itemsPrice * 0.15;
    state.taxPrice = parseFloat(addDecimals(taxPrice));

    // Calculate total price
    const totalPrice = itemsPrice + state.shippingPrice + taxPrice;
    state.totalPrice = parseFloat(addDecimals(totalPrice));

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
};

// export const updateCart = (state:CartState):CartState => {
//     // calc items price
//     state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0));
//     // calc shipping price
//     state.shippingPrice = addDecimals(parseFloat(state.itemsPrice) > 100 ? 0 :10);
//     // calc tax price
//     state.taxPrice = addDecimals(parseFloat(state.itemsPrice) * 0.15);
//     //calc total price
//     state.totalPrice = parseFloat((
//         state.itemsPrice + 
//         state.shippingPrice + 
//         state.taxPrice
//     ).toFixed(2));
//     // state.totalPrice = addDecimals(
//     //     parseFloat(state.itemsPrice) + 
//     //     parseFloat(state.shippingPrice) + 
//     //     parseFloat(state.taxPrice)
//     // );

//     localStorage.setItem('cart', JSON.stringify(state));
//     return state;
// };
