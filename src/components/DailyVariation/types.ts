export type CoinVariation = {
  image: string;
  symbol: string;
  data: PriceProps[];
  isPositiveVariation: boolean;
  formattedVariation: string;
}

export type PriceProps = {
  price: number;
}