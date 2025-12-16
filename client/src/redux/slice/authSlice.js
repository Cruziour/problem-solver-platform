import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: !!localStorage.getItem('accessToken'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      if (user === null) {
        state.isAuth = false;
        state.user = null;
        localStorage.removeItem('user');
      } else {
        state.isAuth = true;
        state.user = user;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      if (!accessToken) {
        state.accessToken = null;
        localStorage.removeItem('accessToken');
      } else {
        state.accessToken = accessToken;
        localStorage.setItem('accessToken', state.accessToken);
      }
    },
    setRefreshToken: (state, action) => {
      const { refreshToken } = action.payload;
      if (!refreshToken) {
        state.refreshToken = null;
        localStorage.removeItem('refreshToken');
      } else {
        state.refreshToken = refreshToken;
        localStorage.setItem('refreshToken', state.refreshToken);
      }
    },
    setClear: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
      state.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setAccessToken, setAuth, setClear, setRefreshToken } =
  authSlice.actions;
export default authSlice.reducer;
