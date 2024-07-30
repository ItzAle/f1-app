const countryCode = (country) => {
  const countryCodes = {
    "United States": "US",
    "United Kingdom": "GB",
    Italy: "IT",
    Spain: "ES",
    Bahrain: "BH",
    "Saudi Arabia": "SA",
    Australia: "AU",
    Japan: "JP",
    China: "CN",
    USA: "US",
    Monaco: "MC",
    Canada: "CA",
    Austria: "AT",
    Hungary: "HU",
    UK: "GB",
    Belgium: "BE",
    Netherlands: "NL",
    Singapore: "SG",
    Brazil: "BR",
  };
  return countryCodes[country] || "";
};

export default countryCode;
