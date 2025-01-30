import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'cart',
    initialState: {
        selectedItems: {}
    },
    reducers: {
        addSelectedItems(state, action) {
            const { brandId, productId } = action.payload;

            if (state.selectedItems[brandId]) {
                state.selectedItems[brandId].push(productId);
            } else {
                state.selectedItems[brandId] = [productId];
            }
        },
        removeSelectedItems(state, action) {
            const { brandId, productId } = action.payload;

            const indexToBeRemoved = state.selectedItems[brandId]?.indexOf(productId) ?? -1;

            if (indexToBeRemoved === -1) return state;

            if (state.selectedItems[brandId].length === 1) {
                delete state.selectedItems[brandId];
            } else {
                state.selectedItems[brandId].splice(indexToBeRemoved, 1);
            }
        }
    }
});

export default { slice, ...slice.actions };
