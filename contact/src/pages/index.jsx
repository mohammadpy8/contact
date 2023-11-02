import React, { useState } from "react";
import { useQuery } from "react-query";

const Main = () => {
  const [getData, setGetData] = useState([]);

  const { isLoading, error, data } = useQuery("repoData", () => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
      res.json();
    }).then(data2 => console.log(data2))
  });

  console.log(data);

  return <div></div>;
};

export default Main;
