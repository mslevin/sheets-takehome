import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../store/header/headerSlice';
import workbookReducer from '../store/workbook/workbookSlice';

const store = configureStore({
    reducer: {
        header: headerReducer,
        workbook: workbookReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;