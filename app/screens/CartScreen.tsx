import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Alert, Image } from "react-native";
import axios from "axios";
import serverAdress from "../../backend/DbAdressConfig";
import { useUser } from "../context/UserContext";
import { CartItem } from "../components/ListOfItems";
import styles from "../assets/CustomStyleSheet";

const CartScreen = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [editedQuantities, setEditedQuantities] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const fetchCart = () => {
    axios
      .get(`${serverAdress}cart/${user.id}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log("Error loading cart: ", err));
  };

  const changeQuantity = (itemId: number, delta: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const current = editedQuantities[itemId] ?? item.quantity ?? 1;
    const updated = current + delta;

    if (updated < 0) return;

    if (updated === 0) {
      Alert.alert(
        "Remove Item",
        "Do you want to remove this item from your cart?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeItem(itemId),
          },
        ]
      );
    } else {
      setEditedQuantities((prev) => ({
        ...prev,
        [itemId]: updated,
      }));
    }
  };

  const removeItem = (itemId: number) => {
    axios
      .delete(`${serverAdress}cart/delete`, {
        data: { userId: user.id, itemId },
      })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        const { [itemId]: _, ...rest } = editedQuantities;
        setEditedQuantities(rest);
      })
      .catch((err) => console.log("Error removing item: ", err));
  };

  const updateCart = () => {
    const updates = Object.entries(editedQuantities).map(([itemId, qty]) => ({
      userId: user.id,
      itemId: parseInt(itemId),
      quantity: qty,
    }));

    axios
      .put(`${serverAdress}cart/update`, updates)
      .then(() => {
        fetchCart();
        setEditedQuantities({});
      })
      .catch((err) => console.log("Error updating cart: ", err));
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    const quantity = editedQuantities[item.id] ?? item.quantity ?? 1;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.qtyContainer}>
            <Pressable
              onPress={() => changeQuantity(item.id, -1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </Pressable>
            <Text style={styles.qtyText}>Qty: {quantity}</Text>
            <Pressable
              onPress={() => changeQuantity(item.id, 1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.price}>
            ${(item.price * quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${serverAdress}${item.image_url}` }}
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        cartItems.length === 0 ? (
          <Text style={styles.empty}>cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )
      ) : (
        <Text style={styles.empty}>user not connected</Text>
      )}

      {Object.keys(editedQuantities).length > 0 && (
        <Pressable style={styles.updateButton} onPress={updateCart}>
          <Text style={styles.updateButtonText}>Update Cart</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CartScreen;
