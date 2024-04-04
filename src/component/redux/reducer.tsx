import { createSlice } from "@reduxjs/toolkit";
import { State } from "../common/interface";
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
  trending,
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
  trending : [],
  modal: false,
  watchlist: [],
  singlecoin: {},
  chartData: [],
  days: 1,
  showWatchList: false,
  coinInfoButton: false,
  errorMsg : { tableError : "",chartError : "", singleCoinError : ""}
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
      state.credentials = { id: action.payload.user._id, email: action.payload.user.email }
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.alertMsg = action.payload.msg;
      state.signIn = action.payload.status;
      state.status = action.payload.status
    });

    // ----------------- Auth Rejection ---------------------

    builder.addCase(login.rejected, (state, action : any) => {
      state.alertMsg = action.payload.message;
      state.login = false;
      state.status = false
    });

    builder.addCase(signIn.rejected, (state, action : any) => {
      state.alertMsg = action.payload.message;
      state.signIn = false
      state.status = false
    });

    builder.addCase(findUser.rejected, (state, action: any) => {
      const { msg, status } = action.payload
      state.alertMsg = msg
      state.login = status
      state.status = status
    });

    // ----------------  Database manipulation --------------------
    builder.addCase(addCoin.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });

    builder.addCase(deleteCoin.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });

    builder.addCase(getwatchList.fulfilled, (state, action) => {
      state.watchlist = action.payload;
    });

  // ----------------- Database Rejection -------------------------

     builder.addCase(addCoin.rejected, (state, action : any) => {
      state.alertMsg = action.payload.message;
    });

    builder.addCase(deleteCoin.rejected, (state, action : any) => {
      state.alertMsg = action.payload.message;
    });

    builder.addCase(getwatchList.rejected, (state, action : any) => {
      state.alertMsg = action.payload.message;
    });

      // ----------------- API Rejection -------------------------

      builder.addCase(coinsList.fulfilled, (state, action) => {
        state.coinsList = action.payload;
        state.paginationList = action.payload;
        state.errorMsg.tableError = "";
      });
  
      builder.addCase(singleCoin.fulfilled, (state, action) => {
        state.singlecoin = action.payload;
        state.errorMsg.singleCoinError = "";
      });
  
      builder.addCase(historicalChart.fulfilled, (state, action) => {
        state.chartData = action.payload;
        state.errorMsg.chartError = "";
      });
  
      builder.addCase(trending.fulfilled, (state, action) => {
        state.trending = action.payload;
      });

    // ----------------- API Rejection -------------------------
    builder.addCase(coinsList.rejected, (state, action) => {
      const {status, coinsList, paginationList, msg} = action.payload as { status: false, login: true, coinsList: any[], paginationList: any[], msg: string }
      state.status = status;
      state.coinsList = coinsList
      state.paginationList = paginationList
      state.alertMsg = msg;
      state.errorMsg.tableError = msg;
    });

    builder.addCase(historicalChart.rejected, (state, action) => {
      const {status, chartData, msg} = action.payload as { status: false, login: true, chartData: any[], msg: string }
      state.status = status;
      state.chartData = chartData
      state.alertMsg = msg;
      state.errorMsg.chartError = msg;
    });

    builder.addCase(singleCoin.rejected, (state, action) => {
      const {status, singlecoin, msg} = action.payload as { status: false, login: true, singlecoin: any[], msg: string }
      state.status = status;
      state.singlecoin = singlecoin
      state.alertMsg = msg;
      state.errorMsg.singleCoinError = msg;
    });

    builder.addCase(trending.rejected, (state, action) => {
      const {status, trending, msg} = action.payload as { status: boolean, login: boolean, trending: any[], msg: string }
      state.status = status;
      state.singlecoin = trending
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
