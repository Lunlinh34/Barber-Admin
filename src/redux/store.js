import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './slice/sidebarSlice';
const rootReducer = {
    sidebars: sidebarSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
