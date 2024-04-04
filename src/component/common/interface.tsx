// login

export interface User {
  email: string;
  password: string;
}

// Trending coins API Data

export interface TrendingCoins {
  ath: string;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: string;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: any;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

// reducer state

export interface State {
  status: boolean;
  login: boolean;
  signIn: boolean;
  credentials: { id: string, email: string }
  alertMsg: string;
  dataMsg: string
  currency: string;
  symbol: string;
  inputSearch: string;
  coinsList: TrendingCoins[];
  paginationList: TrendingCoins[];
  filteredList: TrendingCoins[];
  trending : any[]
  modal: boolean;
  watchlist: string[];
  singlecoin: {};
  chartData: any[];
  days: number;
  showWatchList: boolean;
  coinInfoButton: boolean
  errorMsg : { tableError : string,chartError : string, singleCoinError : string}
}

// HOC

export type Auth = {
  id: boolean;
  show: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  head?: string,
  text?: string
}