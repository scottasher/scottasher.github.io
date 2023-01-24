import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request, { renderQueries } from "../../../utils/request";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  async (obj) => {
    console.log(obj);
    const queries = renderQueries(obj);
    const res = await request(`/places${queries}`);
    return res.data;
  }
);

export const deletePlaces = createAsyncThunk(
  "places/deletePlaces",
  async ({ data, parentId }, { rejectWithValue }) => {
    const res = await request(`/places?parent=${parentId}`, {
      method: "delete",
      data,
    });
    if (!res.data.places) {
      rejectWithValue();
    }
    return res.data;
  }
);

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    resetPlaces() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlaces.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.data = [];
        state.status = "succeeded";
        state.data = state.data.concat(action.payload.data);
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePlaces.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePlaces.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        const newData = state.places.filter((x) => !data.includes(x._id));
        state.data = newData;
      })
      .addCase(deletePlaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPlaces } = placesSlice.actions;

export default placesSlice.reducer;
