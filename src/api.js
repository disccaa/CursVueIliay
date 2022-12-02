const tickers = new Map();

 const loadTickers = () => {
// debugger;
  if (tickers.size === 0) {
    return
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickers.keys()].join(',')}&tsyms=USD&api_key=b28f4d17ee44cf0a57d731304041322c33d63e8741d1652f9fc6615859a67f43`
  ).then((r) => r.json()).then(rawData =>{ 
    const updatedPrice =  Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, value.USD]));
    Object.entries(updatedPrice).forEach(([currency, newPrice]) => {
      const handlers = tickers.get(currency) ?? []
      handlers.forEach(fun => fun(newPrice))
    })
  });
}


export const subscribeToTickers = (ticker, cb) => {
  const subscribers = tickers.get(ticker) || []
  tickers.set(ticker, [...subscribers, cb])
}

export const unsubscribeToTickers = (ticker, cb) => {
  const subscribers = tickers.get(ticker) || []
  tickers.set(ticker, subscribers.filter(fn => fn !== cb))
}

// setInterval(loadTickers, 5000)
window.tickers = tickers