import React, { useRef } from "react";
import { View, Text, FlatList, Image, Alert, Pressable } from "react-native";
import serverAdress from "../../backend/DbAdressConfig";
import styles from "../assets/CustomStyleSheet";
import { User } from "../context/UserContext";
import axios from "axios";
import ItemAddedAnimation, {
  ItemAddedAnimationRef,
} from "./ItemAddedAnimation";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity?: number;
}

export interface ListOfItemsProps {
  items: CartItem[];
  user?: User;
}

const ListOfItems: React.FC<ListOfItemsProps> = ({ items, user }) => {
  const animationRef = useRef<ItemAddedAnimationRef>(null);

  const onLongPressCallback = (itemId: number) => {
    user
      ? axios
          .post(`${serverAdress}cart/add`, {
            userId: user.id,
            itemId: itemId,
            quantity: 1,
          })
          .then(() => {
            animationRef.current?.triggerFallAnimation();
          })
          .catch((err) =>
            console.log("   - error adding items to the cart : " + err)
          )
      : Alert.alert("No user connected", "cannot add to the cart");
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <Pressable
      style={styles.itemContainer}
      onLongPress={() => {
        onLongPressCallback(item.id);
      }}
    >
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${serverAdress}${item.image_url}` }}
          style={styles.image}
        />
      </View>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <ItemAddedAnimation ref={animationRef} />
    </View>
  );
};

export default ListOfItems;
