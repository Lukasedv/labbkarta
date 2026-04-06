const COUNTRY_TO_ISO: Record<string, string> = {
  Germany: "DE",
  "United Kingdom": "GB",
  France: "FR",
  Spain: "ES",
  Sweden: "SE",
  Italy: "IT",
  Turkey: "TR",
  Poland: "PL",
  Netherlands: "NL",
  Greece: "GR",
  Belgium: "BE",
  Norway: "NO",
  Ireland: "IE",
  Portugal: "PT",
  Switzerland: "CH",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Romania: "RO",
  Ukraine: "UA",
  Finland: "FI",
  Austria: "AT",
  Hungary: "HU",
  Croatia: "HR",
  Luxembourg: "LU",
  Slovakia: "SK",
  Bulgaria: "BG",
  Serbia: "RS",
  Slovenia: "SI",
  Estonia: "EE",
  Latvia: "LV",
  Lithuania: "LT",
  Cyprus: "CY",
  Iceland: "IS",
  "Bosnia and Herzegovina": "BA",
  "North Macedonia": "MK",
  Albania: "AL",
  Montenegro: "ME",
  Moldova: "MD",
  Kosovo: "XK",
  Malta: "MT",
};

export function getCountryFlag(country: string): string {
  const iso = COUNTRY_TO_ISO[country];
  if (!iso) return "";
  return String.fromCodePoint(
    ...iso.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
