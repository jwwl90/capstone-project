import React from "react";

const StockItem = ({ stock }) => {
  const { symbol, quantity, purchasePrice, currentPrice } = stock;
  const currentValue = quantity * currentPrice;
  const profitLoss = currentValue - quantity * purchasePrice;

  return (
    <div className="stock-item">
      <h3>{symbol}</h3>
      <p>Quantity: {quantity}</p>
      <p>Purchase Price: ${purchasePrice.toFixed(2)}</p>
      <p>Current Price: ${currentPrice.toFixed(2)}</p>
      <p>Current Value: ${currentValue.toFixed(2)}</p>
      <p>Profit/Loss: ${profitLoss.toFixed(2)}</p>
    </div>
  );
};

export default StockItem;
