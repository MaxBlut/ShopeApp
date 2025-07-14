import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import { useUser } from "../context/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
  const { user, logout } = useUser();
  const [userName, setUserName] = useState(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    user ? setUserName(user.name) : setUserName(null);
  }, [user]);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>ShopeApp</Text>

        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.navItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.navItem}>Cart</Text>
          </TouchableOpacity>
          {user ? (
            <TouchableOpacity onPress={logout}>
              <Text style={styles.navItem}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.navItem}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <Text style={styles.title}>
          {userName ? `Welcome, ${userName}` : "Unconnected"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  logo: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  nav: {
    flexDirection: "row",
    gap: 15,
  },
  navItem: {
    fontSize: 16,
    color: "#007bff",
  },
});
