import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "playerData",
    initialState: {
        value: {
            //user object
        },
    },
    reducers: {
        /*updatePlayerCharacter: (state, action) => {
            state.value.character = action.payload;
        },

        updatePlayerWeapons: (state, action) => {
            state.value.weapons = action.payload;
        },

        updatePlayerPotions: (state, action) => {
            state.value.potions = action.payload;
        },

        updatePlayerItems: (state, action) => {
            state.value.items = action.payload;
        },

        updateFreeSlots: (state, action) => {
            state.value.freeSlots = action.payload;
        },

        updatePlayerGold: (state, action) => {
            state.value.gold = action.payload;
        },

        updateBuyDisabled: (state, action) => {
            state.value.buyDisabled = action.payload;
        },

        updateGameState: (state, action) => {
            state.value.gameState = action.payload;
        },*/
    },
});

// export methods to update state
export const {
    /*updatePlayerCharacter,
    updatePlayerWeapons,
    updatePlayerPotions,
    updatePlayerItems,
    updateBuyDisabled,
    updatePlayerGold,
    updateFreeSlots,
    updateGameState,*/
} = userSlice.actions;

export default userSlice.reducer;
