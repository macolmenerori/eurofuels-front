/**
 * Maps EU country names (as returned by the price API) to ISO 3166-1 alpha-2
 * country codes. All 27 EU member states are covered.
 *
 * Note: eu_boundaries.json carries ISO_A2='-99' for France (known Natural Earth
 * dataset quirk). This map uses the correct 'FR' code; the boundary layer should
 * be matched on the NAME field where ISO_A2 is unreliable.
 */
export const COUNTRY_TO_ISO = {
  Austria: 'AT',
  Belgium: 'BE',
  Bulgaria: 'BG',
  Croatia: 'HR',
  Cyprus: 'CY',
  Czechia: 'CZ',
  Denmark: 'DK',
  Estonia: 'EE',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  Hungary: 'HU',
  Ireland: 'IE',
  Italy: 'IT',
  Latvia: 'LV',
  Lithuania: 'LT',
  Luxembourg: 'LU',
  Malta: 'MT',
  Netherlands: 'NL',
  Poland: 'PL',
  Portugal: 'PT',
  Romania: 'RO',
  Slovakia: 'SK',
  Slovenia: 'SI',
  Spain: 'ES',
  Sweden: 'SE'
} as const;

export type CountryName = keyof typeof COUNTRY_TO_ISO;

/**
 * Returns the ISO 3166-1 alpha-2 code for a given country name,
 * or undefined if the name is not in the EU-27 map.
 */
export function countryToIso(name: string): string | undefined {
  return (COUNTRY_TO_ISO as Record<string, string>)[name];
}
