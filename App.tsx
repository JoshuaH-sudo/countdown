import React from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import { EuiProvider } from "@elastic/eui";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export const storage_name = "countdown-goals";

export type root_stack_param_list = {
  Main_screen: undefined;
  Goal_form: undefined;
};

export type screen_props<T extends keyof root_stack_param_list> = {
  route: RouteProp<root_stack_param_list, T>;
  navigation: NativeStackNavigationProp<root_stack_param_list, T>;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EuiProvider colorMode="dark">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main_screen">
          <Stack.Screen name="Main_screen" getComponent={() => require("./components/screens/Main_screen").default} />
          <Stack.Screen name="Goal_form" getComponent={() => require("./components/screens/Countdown_goal_form").default} />
        </Stack.Navigator>
      </NavigationContainer>
    </EuiProvider>
  );
}
