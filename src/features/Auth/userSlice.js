import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        updateUser(state, action) {
            return action.payload;
        },
        reset() {
            return null;
        }
    }
});

export default { slice, ...slice.actions };
