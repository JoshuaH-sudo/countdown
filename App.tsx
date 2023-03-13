import React from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import { Main_screen } from "./components/screens/Main_screen";

//React native stack navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Countdown_goal_form from "./components/screens/Countdown_goal_form";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main_screen">
        <Stack.Screen name="Main_screen" component={Main_screen} />
        <Stack.Screen
          name="Countdown_Goal_Form"
          component={Countdown_goal_form}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
