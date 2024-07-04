import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msges: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMsges: (state, action) => {
            if(state.msges.length == 0){
                state.msges.push(action.payload);
            }
            else if(action.payload.time != state.msges.slice(-1)[0].time){
                state.msges.push(action.payload);
            }
        }
    }
})

export const {setMsges} = chatSlice.actions;

export default chatSlice.reducer;