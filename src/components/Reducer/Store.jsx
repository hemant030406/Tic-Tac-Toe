import { configureStore } from "@reduxjs/toolkit";
import VisibilityReducer from "./VisibilityReducer";
import Reducer from "./Reducers";

const store = configureStore({
    reducer: {
        visibilityReducer: VisibilityReducer,
        reducers: Reducer
    }
})

export default store