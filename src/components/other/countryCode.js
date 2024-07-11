const countryCode = (country) => {
  const countryCodes = {
    "United States": "US",
    "United Kingdom": "GB",
    Italy: "IT",
    Spain: "ES",
    Bahrain: "BH",
    "Saudi Arabia" : "SA",
    Australia : "AU",
    Japan: "JP",
    China: "CN",
    USA: "US",
    Monaco : "MC",
    Canada: "CA",
    Austria: "AT",
    Bahrein: "BH",
    Brazil: "BR",
    Belgium: "BE",
    Hungary: "HU",
    Mexico: "MX",
    Qatar: "QA",
    Azerbaijan: "AZ",
    "Great Britain": "GB",
    Singapore: "SG",
    Netherlands: "NL",
    "Abu Dhabi": "AE",

  };
  return countryCodes[country] || "";
};

export default countryCode;
