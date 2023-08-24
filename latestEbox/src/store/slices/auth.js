import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query';
import { setMessage } from './message';
import AuthService from '../services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));
import toast from 'react-hot-toast';

export const register = createAsyncThunk('auth/register', async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await AuthService.register(username, email, password);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const data = await AuthService.login(email, password);
    return { user: data };
  } catch (err) {
    let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;

    thunkAPI.dispatch(setMessage(message));
    console.log('asdfasd', thunkAPI.rejectWithValue);
    return thunkAPI.rejectWithValue();
  }
});

// export const logout = createAsyncThunk('auth/logout', async () => {
//   await AuthService.logout();
// });

const initialState = user
? { isLoggedIn: true, user, token: user.token , loading:false }
: { isLoggedIn: false, user: null, token: null , loading:false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    // [register.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    // },
    // [register.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    // },
    [login.fulfilled]: (state, action) => {
      // console.log('checking token',action.payload);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.user.token;
      state.loading = false;
    },
    [login.pending]: (state, action) => {
      // console.log('checking token',action.payload);
      state.loading = true;
    },
    // builder.addCase(login.fulfilled,(state, action) => {
    //   console.log('checking token',action.payload);
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    //   state.token = action.payload.user.token;
    // })
    [login.rejected]: (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
      // toast.error(action.payload.data.message);
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
});

export const { logout } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
