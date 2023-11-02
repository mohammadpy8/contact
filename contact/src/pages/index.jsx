import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Main = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const getData = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await getData.json();
    setData(data);
  };

  useEffect(() => {
    fetchUsers();
  },[]);
    
    console.log(data);

  return <div></div>;
};

export default Main;
