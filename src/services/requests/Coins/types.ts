export type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap_change_percentage_24h: number
  price?: string
  percentage_24h?: string
}

export type VariationResponse = {
  prices: [[number, number]];
  market_caps: [[number, number]];
  total_volumes: [[number, number]];
};
