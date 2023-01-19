import React from "react"
import { View } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./Pages/HomeScreen"
import TopBar from "./Nav/TopBar"
import TodoDetails from "./Pages/TodoDetails"

const Stack = createStackNavigator();

const GlobalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Remainder" component={TopBar} />
          <Stack.Screen name="Todo" component={TodoDetails}
          options={({ route }) => ({
            title: route.params.title,
        })}
        />
    </Stack.Navigator>
  );
}
export default GlobalStack