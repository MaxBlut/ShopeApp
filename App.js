import React from "react";
import { SafeAreaView } from "react-native";
import Header from "./app/components/Header";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./app/context/UserContext";
import StackNavigator from "./app/navigation";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, paddingVertical: 40 }}>
          <Header />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </UserProvider>
  );
}
