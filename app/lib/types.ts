export type CountryPrice = {
  country: string;
  gasoline: string;
  diesel: string;
};

export type CountryPriceWithIso = CountryPrice & {
  /** ISO 3166-1 alpha-2 country code, e.g. 'BE' for Belgium. */
  ISO_country: string;
};
