import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { searchCoins } from "../../services/cyrptoApi";
import { TailSpin } from "react-loader-spinner";
import styles from "./Search.module.css";

const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coin, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoin([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const searchCoin = async () => {
      try {
        const res = await fetch(searchCoins(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setIsLoading(false);
          setCoin(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    searchCoin();

    return () => controller.abort();
  }, [text]);
  return (
    <SearchCoinApi
      setText={setText}
      currency={currency}
      isLoading={isLoading}
      setCurrency={setCurrency}
      coin={coin}
      text={text}
    />
  );
};

export default Search;

const SearchCoinApi = ({
  coin,
  setCurrency,
  setText,
  isLoading,
  currency,
  text,
}) => {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={text}
        placeholder="search coins"
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coin.length || isLoading) && (
        <SearchBox isLoading={isLoading} coin={coin} />
      )}
    </div>
  );
};

const SearchBox = ({ isLoading, coin }) => {
  return (
    <div className={styles.searchResult}>
      {isLoading && (
        <TailSpin color="#3874ff" strokeWidth="3" width="50px" height="50px" />
      )}
      <ul>
        {coin.map((coin) => {
          const { id, name, thumb } = coin;
          return (
            <li key={id}>
              <img src={thumb} alt={id} />
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
