import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        updateUser(state, action) {
            return action.payload;
        }
    }
});

export default { slice, ...slice.actions };
