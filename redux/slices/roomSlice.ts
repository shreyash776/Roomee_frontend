import { createSlice } from '@reduxjs/toolkit';

interface RoomState {
  rooms: any[];
  currentRoom: null | object;
}

const initialState: RoomState = {
  rooms: [],
  currentRoom: null
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    }
  }
});

export const { setRooms, setCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
