


export const loadTickers = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(',')}&api_key=b28f4d17ee44cf0a57d731304041322c33d63e8741d1652f9fc6615859a67f43`
  ).then((r) => r.json()).then(rawData => Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, 1/ value])));
