import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebarShow: true,
    },
    reducers: {
        changeState(state, action) {
            state.sidebarShow = action?.payload.sidebarShow;
        },
    },
});

const { actions, reducer } = sidebarSlice;

export const { changeState } = actions;

export default reducer;
