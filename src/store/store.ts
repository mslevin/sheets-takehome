import { configureStore } from "@reduxjs/toolkit";
import workbookReducer from '../store/workbook/workbookSlice';

const store = configureStore({
    reducer: {
        workbook: workbookReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;