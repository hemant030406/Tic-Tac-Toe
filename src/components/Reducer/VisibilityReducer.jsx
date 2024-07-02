import React from 'react'
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    visible: false
}


const slice = createSlice({
    name: 'visibility',
    initialState,
    reducers:{
        setVisible: (state) => {
            state.visible = true
        },
        setHidden: (state) => {
            state.visible = false
        }
    }
})

export const {setVisible, setHidden} =  slice.actions;

export default slice.reducer;
