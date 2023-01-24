import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { queries } from "@testing-library/react";
import request, { renderQueries } from "../../../utils/request";

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

export const fetchPlace = createAsyncThunk(
  "palce/fetchPlace",
  async ({ id, ...obj }) => {
    const queries = renderQueries(obj);
    const res = await request(`/places/${id}${queries}`);
    return res.data;
  }
);

export const addNewPlace = createAsyncThunk(
  "palce/addNewPlace",
  async ({ data, ...obj }, { rejectWithValue }) => {
    const queries = renderQueries(obj);
    const res = await request(`/places${queries}`, {
      method: "post",
      data,
    });
    return res.data;
  }
);

export const updatePlace = createAsyncThunk(
  "palce/updatePlace",
  async ({ data, id, ...obj }, { rejectWithValue }) => {
    const queries = renderQueries(obj);
    const res = await request(`/places/${id}${queries}`, {
      method: "put",
      data: data,
    });
    return res.data;
  }
);

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    resetPlace() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlace.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.data = {};
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPlace.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.data = action.payload.data;
      });
  },
});

export const { resetPlace } = placeSlice.actions;

export default placeSlice.reducer;
