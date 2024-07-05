import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msges: [],
    users: []
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
        },
        setUsers: (state, action) => {
            state.users.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user !== action.payload)
        },
    }
})

export const {setMsges, setUsers, deleteUser} = chatSlice.actions;

export default chatSlice.reducer;