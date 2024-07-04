import { configureStore } from "@reduxjs/toolkit";
import VisibilityReducer from "./VisibilityReducer";
import msgReducer from "./msgReducer";

const store = configureStore({
    reducer: {
        visibilityReducer: VisibilityReducer,
        msg: msgReducer
    }
})

export default store