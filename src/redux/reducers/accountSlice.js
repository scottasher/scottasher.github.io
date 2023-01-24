import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTokens, setToken } from "../../utils/authority";
import request from "../../utils/request";

const initialState = {
  currentUser: {
    active: false,
  },
  status: "idle",
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async () => {
    const res = await request(`/account/current`);
    return res.data;
  }
);

export const userLogout = createAsyncThunk("account/userLogout", async () => {
  deleteTokens();
  return { active: false, status: "success" };
});

export const forgotPassword = createAsyncThunk(
  "account/forgotPassword",
  async (data) => {
    const res = await request(`/account/forgot/password`, {
      method: "post",
      data,
    });
    return res.data;
  }
);

export const userLogin = createAsyncThunk("account/userLogin", async (data) => {
  const res = await request(`/account/login`, {
    method: "post",
    data: { user: data },
  });

  setToken(res.data.user.apiTok);
  return res.data;
});

export const userRegister = createAsyncThunk(
  "account/userRegister",
  async (data) => {
    const res = await request(`/account`, {
      method: "post",
      data: { user: data },
    });

    // setToken(res.data.user.apiTok);
    return res.data;
  }
);

export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async (data) => {
    const res = await request(`/account/update`, {
      method: "put",
      data: { user: data },
    });

    return res.data;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCH CURRENT USER
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // END FETCH CURRENT USER
      // FORGOT PASSWORD
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // END FORGOT PASSWORD
      // ADD NEW USER
      .addCase(userLogout.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      // END ADD NEW USER
      // LOGIN USER
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // END LOGIN USER
      // UPDATE USER
      .addCase(updateAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // END UPDATE USER
      // UPDATE USER
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // END UPDATE USER
  },
});

export const { accountAdded } = accountSlice.actions;

export default accountSlice.reducer;

export const selectCurrentUser = (state) => state.account.currentUser;
export const selectAccountById = (state, accountId) =>
  state.account.account.find((account) => account.id === accountId);
