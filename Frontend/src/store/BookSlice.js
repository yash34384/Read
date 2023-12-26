/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'pending'
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(fetchSingleBook.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchSingleBook.rejected, (state, action) => {
        state.status = 'error';
      })
  }
});

// export const { fetchBook } = bookSlice.actions;
export default bookSlice.reducer;

export const fetchBook = createAsyncThunk('books/fetch', async (string) => {
  const { data } = await axios.get(`/api/v1/books${string}`);
  const { books } = data;
  return books;
})

export const fetchSingleBook = createAsyncThunk('books/fetchSingle', async (string) => {
  const { data } = await axios.get(`/api/v1/books/${string}`);
  const { book } = data;
  return book;
})