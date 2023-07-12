import React from "react";
// import "@elastic/eui/dist/eui_theme_dark.css";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Serialized_countdown_goal } from "./components/common";

export const storage_name = "countdown-goals";

export type root_stack_param_list = {
  Main_screen: undefined;
  Goal_form?: {
    edit_item: Serialized_countdown_goal
  };
};

export type screen_props<T extends keyof root_stack_param_list> = {
  route: RouteProp<root_stack_param_list, T>;
  navigation: NativeStackNavigationProp<root_stack_param_list, T>;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main_screen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main_screen"
          getComponent={() =>
            require("./components/screens/main/Main_screen").default
          }
        />
        <Stack.Screen
          name="Goal_form"
          getComponent={() =>
            require("./components/screens/goal_form/Countdown_goal_form").default
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
