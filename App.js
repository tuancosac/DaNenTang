import React, { useState } from "react";
import { StatusBar } from "react-native";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LogInScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Login");
  const navigation = {
    navigate: (screen) => setCurrentScreen(screen),
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />
      {currentScreen === "Register" ? (
        <SignUpScreen navigation={navigation} />
      ) : currentScreen === "Home" ? (
        <HomeScreen />
      ) : (
        <LogInScreen navigation={navigation} />
      )}
    </>
  );
}
