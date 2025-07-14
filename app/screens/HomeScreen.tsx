import serverAdress from "../../backend/DbAdressConfig";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ListOfItems, { CartItem } from "../components/ListOfItems";

export default function HomeScreen() {
  const { user } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  // const [items, setItems] = useState<ListOfItemsProps>([]);

  useEffect(() => {
    axios
      .get(serverAdress + "items")
      .then((res) => setItems(res.data))
      .catch((err) =>
        console.log("error loading list of items from the shop:" + err)
      );
  }, []);

  return <ListOfItems user={user} items={items} />;
}
