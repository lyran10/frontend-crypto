import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CoinList, SingleCoin, HistoricalChart } from "../utils/coinapi";

type Data = {
  id: string | undefined;
  currency: string | undefined;
  days: number;
};

// ---------------- Authentication API--------------------------
// ${process.env.REACT_APP_SERVER_URL}
export const findUser = createAsyncThunk(
  "crypto/findUser",
  async ({ id }: { id: string | undefined }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/expiry`, { id: id }, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error)
      // if (axios.isAxiosError(error)) {
      //   let axiosError = error as AxiosError<{ msg: string, status: boolean }>
        return rejectWithValue(error)
      // }
    }

  }
);

export const logout = createAsyncThunk(
  "crypto/logout",
  async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/logout`, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const login = createAsyncThunk(
  "crypto/login",
  async (user: { email: string, password: string }, { rejectWithValue }) => {
    const { email, password } = user
    try {
      const { data } = await axios.post(`http://localhost:4000/api/login`, { email, password }, { withCredentials: true });
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let axiosError = error as AxiosError<{ msg: string, status: boolean }>
        return axiosError.response?.data
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "crypto/signIn",
  async (user: { email: string, password: string }) => {
    const { email, password } = user
    try {
      const { data } = await axios.post(`http://localhost:4000/api/signup`, { email, password });
      return data
    } catch (error) {
      console.log(error);
    }
  }
);

// ---------------- Coins Data API--------------------------
export const coinsList = createAsyncThunk(
  "crypto/coinList",
  async (currency: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CoinList(currency));
      return data;
    } catch (error) {
      return rejectWithValue({ status: false, login: true, coinsList: [], paginationList: [], msg: "Not able to fetch data. Please try later" })
    }

  }
);

export const singleCoin = createAsyncThunk(
  "crypto/singlecoin",
  async (currency: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(SingleCoin(currency));
      return data;
    } catch (error) {
      return rejectWithValue({ status: false, login: true, singlecoin: [], msg: "Not able to fetch data. Please try later" })
    }

  }
);

export const historicalChart = createAsyncThunk(
  "crypto/historicalChart",
  async ({ currency, days, id }: Data, { rejectWithValue }) => {
    try {
      const {
        data: { prices },
      } = await axios.get(HistoricalChart(id, days, currency));
      return prices;
    } catch (error) {
      return rejectWithValue({ status: false, login: true, chartData: [], msg: "Not able to fetch data. Please try later" })
    }

  }
);

// ---------------- coins manipulation API --------------------------

export const getwatchList = createAsyncThunk(
  "crypto/watchList",
  async (id: string) => {
    const {
      data: {
        list: { watchlist },
      },
    } = await axios.post(`http://localhost:4000/api/list`, { id: id }, { withCredentials: true });
    return watchlist;
  }
);

export const addCoin = createAsyncThunk(
  "crypto/addCoin",
  async (info: { id: string, coin: string | undefined }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/addcoin`, info, { withCredentials: true }
      );
      return data.msg
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCoin = createAsyncThunk(
  "crypto/delCoin",
  async (info: { id: string, coin: string | undefined }) => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/deletecoin`, info, { withCredentials: true })
      return data.msg
    } catch (error) {
      console.log(error)
    }
  }
);