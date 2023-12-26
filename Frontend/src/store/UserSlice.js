/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  status: 'pending',
  isAuthenticated: 'false'
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'pending',
          state.isAuthenticated = 'false'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'fulfilled',
          state.isAuthenticated = 'true',
          state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error',
          state.isAuthenticated = 'false'
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'pending',
          state.isAuthenticated = 'false'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled',
          state.isAuthenticated = 'true',
          state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error',
          state.isAuthenticated = 'false'
      })
      .addCase(getLoginUser.pending, (state, action) => {
        state.data = null,
          state.status = 'pending',
          state.isAuthenticated = 'false'
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled',
          state.data = action.payload,
          state.isAuthenticated = action.payload.success == false ? false : true;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.status = 'error',
          state.isAuthenticated = 'false',
          state.data = null

      })
  }
})

export default UserSlice.reducer;

export const registerUser = createAsyncThunk('user/registerSingle', async (form) => {
  try {
    const config = { header: { 'Content-type': 'multipart/form-data' } };
    await axios.post(`/api/v1/user`, form, config);
  }
  catch (err) {
    console.log(err.response.data.message);
  }
});

export const loginUser = createAsyncThunk('user/login', async (loginForm) => {
  try {
    const config = { header: { 'Content-type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/v1/login`, loginForm, config);
    const { user } = data
    return user;
  } catch (err) {
    console.log(err.response.data.message);
  }
});

export const getLoginUser = createAsyncThunk('user/detail', async () => {
  try {
    const { data } = await axios.get(`/api/v1/me`);
    const { user } = data
    return user;
  } catch (err) {
    return err.response.data;
  }
});