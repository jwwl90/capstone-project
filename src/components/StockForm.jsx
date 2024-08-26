import React, { useState, useCallback } from "react";
import { useStocks } from "../StockContext";

const StockForm = () => {
  const { setStocks } = useStocks();
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStockData = useCallback((symbol) => {
    return fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
          return parseFloat(data["Global Quote"]["05. price"]);
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
        return null;
      });
  }, []);

  const handleAddStock = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchStockData(symbol).then((currentPrice) => {
      if (currentPrice) {
        setStocks((prevStocks) => [
          ...prevStocks,
          {
            symbol,
            quantity: parseFloat(quantity),
            purchasePrice: parseFloat(purchasePrice),
            currentPrice,
          },
        ]);
      } else {
        alert("Invalid stock symbol or data could not be fetched.");
      }
      setSymbol("");
      setQuantity("");
      setPurchasePrice("");
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleAddStock} className="stock-form">
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Add Stock"}
      </button>
    </form>
  );
};

export default StockForm;
