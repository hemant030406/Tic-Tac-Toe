import { configureStore } from "@reduxjs/toolkit";
import VisibilityReducer from "./VisibilityReducer";

const store = configureStore({
    reducer: {
        visibilityReducer: VisibilityReducer,
    }
})

export default store