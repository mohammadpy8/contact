import React from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import { TailSpin } from "react-loader-spinner";
import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/cyrptoApi";

const TableCoin = ({ coins, isLoading, currency, setChart }) => {
  const changeCurrency = (price) => {
    if (price === "usd") {
      return "$";
    } else if (price === "eur") {
      return "#";
    } else {
      return "*";
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <TailSpin color="#3874ff" strokeWidth="3" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                changeCurrency={changeCurrency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableCoin;

const TableRow = ({ coin, currency, changeCurrency, setChart }) => {
  const {
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
    id,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart(true);
      setChart(json);
    } catch (error) {
      setChart(null);
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={id} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {changeCurrency(currency)}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>${total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={id} />
      </td>
    </tr>
  );
};
