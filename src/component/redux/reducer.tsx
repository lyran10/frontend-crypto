import { createSlice } from "@reduxjs/toolkit";
import { State } from "../utils/interface";
import {
  coinsList,
  getwatchList,
  findUser,
  singleCoin,
  historicalChart,
  logout,
  login,
  signIn,
  addCoin,
  deleteCoin,
} from "./actions";

const initialState: State = {
  status: false,
  login: false,
  signIn: false,
  credentials: { id: "", email: "" },
  alertMsg: "",
  dataMsg: "",
  currency: "USD",
  symbol: "$",
  inputSearch: "",
  coinsList: [],
  paginationList: [],
  filteredList: [],
  modal: false,
  watchlist: [],
  singlecoin: {},
  chartData: [],
  days: 1,
  showWatchList: false,
  coinInfoButton: false
};

export const values = createSlice({
  name: "State",
  initialState,
  reducers: {
    // ---------------- Authentication ----------------
    userLogin: (state, action) => {
      state.login = action.payload;
    },
    autMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
    getStatus: (state, action) => {
      state.status = action.payload
    },
    // ---------------- Data ----------------
    removeCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    currencyChange: (state, action) => {
      state.currency = action.payload;
    },
    symbolChange: (state, action) => {
      state.symbol = action.payload;
    },
    inputChange: (state, action) => {
      state.inputSearch = action.payload;
      state.filteredList = state.coinsList.filter(
        (coin) =>
          coin.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    getModal: (state, action) => {
      state.modal = action.payload;
    },
    clearwatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    removeData: (state, action) => {
      state.singlecoin = action.payload;
    },
    period: (state, action) => {
      state.days = action.payload;
    },
    showCoinInfo: (state, action) => {
      state.coinInfoButton = action.payload;
    },
    showWatchList: (state, action) => {
      state.showWatchList = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ---------- Authentication ------------------
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.login = action.payload.status
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.alertMsg = action.payload.msg;
      state.login = action.payload.status;
      state.status = action.payload.status
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.alertMsg = action.payload.msg;
      state.login = action.payload.status;
      state.status = action.payload.status
      if (action.payload.user) state.credentials = { id: action.payload.user._id, email: action.payload.user.email }
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.alertMsg = action.payload.msg;
      state.signIn = action.payload.status;
      state.status = action.payload.status
    });

    // ----------------- Auth Rejection ---------------------

    builder.addCase(findUser.rejected, (state, action: any) => {
      const { msg, status } = action.payload
      state.alertMsg = msg
      state.login = status
      state.status = status
    });

    // ----------------  Data --------------------
    builder.addCase(addCoin.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });

    builder.addCase(deleteCoin.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });

    builder.addCase(getwatchList.fulfilled, (state, action) => {
      state.watchlist = action.payload;
    });

    builder.addCase(coinsList.fulfilled, (state, action) => {
      state.coinsList = action.payload;
      state.paginationList = action.payload;
    });

    builder.addCase(singleCoin.fulfilled, (state, action) => {
      state.singlecoin = action.payload;
    });

    builder.addCase(historicalChart.fulfilled, (state, action) => {
      state.chartData = action.payload;
    });

    // ----------------- Data Rejection -------------------------
    builder.addCase(coinsList.rejected, (state, action) => {
      const {status, coinsList, paginationList, msg} = action.payload as { status: false, login: true, coinsList: any[], paginationList: any[], msg: string }
      state.status = status;
      state.coinsList = coinsList
      state.paginationList = paginationList
      state.alertMsg = msg;
    });

    builder.addCase(historicalChart.rejected, (state, action) => {
      const {status, chartData, msg} = action.payload as { status: false, login: true, chartData: any[], msg: string }
      state.status = status;
      state.chartData = chartData
      state.alertMsg = msg;
    });

    builder.addCase(singleCoin.rejected, (state, action) => {
      const {status, singlecoin, msg} = action.payload as { status: false, login: true, singlecoin: any[], msg: string }
      state.status = status;
      state.singlecoin = singlecoin
      state.alertMsg = msg;
    });

  },
});

export const {
  removeCredentials,
  userLogin,
  autMsg,
  getStatus,
  currencyChange,
  inputChange,
  symbolChange,
  getModal,
  clearwatchlist,
  removeData,
  period,
  showWatchList,
  showCoinInfo
} = values.actions;
