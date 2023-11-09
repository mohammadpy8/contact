import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TableCoin from "../modules/TableCoin";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&&x_cg_demo_api_key=CG-cd65CxKs4eppXyrZsx3APwew"
    )
      .then((res) => res.json())
      .then((json) => setCoins(json));
  }, []);

  return (
    <div>
      <TableCoin coins={coins} />
    </div>
  );
};

export default HomePage;