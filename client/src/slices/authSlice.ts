import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/interfaces';

const initialState:AuthState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        logout:(state)=>{ //no need to use (state, action)
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, logout }  = authSlice.actions;

export default authSlice.reducer;