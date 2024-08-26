import React from "react";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { StockProvider } from "./StockContext";
import "./styles.css";

const App = () => {
  return (
    <StockProvider>
      <div className="app">
        <h1>Finance Dashboard</h1>
        <StockForm />
        <h2>Stock List</h2>
        <StockList />
      </div>
    </StockProvider>
  );
};

export default App;
