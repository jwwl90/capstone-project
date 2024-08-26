import React, { useEffect, useCallback } from "react";
import StockItem from "./StockItem";
import { useStocks } from "../StockContext";

const StockList = () => {
  const { stocks, setStocks } = useStocks();

  const fetchStockPrices = useCallback(() => {
    const fetchPromises = stocks.map((stock) => {
      return fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
            const currentPrice = parseFloat(data["Global Quote"]["05. price"]);
            return { ...stock, currentPrice };
          } else {
            return stock;
          }
        })
        .catch((error) => {
          console.error("Error fetching stock data:", error);
          return stock;
        });
    });

    Promise.all(fetchPromises).then((updatedStocks) => {
      setStocks(updatedStocks);
    });
  }, [stocks, setStocks]);

  useEffect(() => {
    fetchStockPrices();
  }, [fetchStockPrices]);

  if (stocks.length === 0) {
    return <p>No stocks available.</p>;
  }

  return (
    <div className="stock-list">
      {stocks.map((stock, index) => (
        <StockItem key={index} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
