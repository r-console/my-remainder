import React from "react"
import { View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./Pages/HomeScreen"
import BottomTab from "./Nav/BottomTab"
import TodoDetails from "./Pages/TodoDetails"
import PaymentDetails from "./Pages/PaymentList"

const Stack = createStackNavigator()

const GlobalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Remainder" component={BottomTab} />
      <Stack.Screen
        name="Todo"
        component={TodoDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="paymentDetails"
        component={PaymentDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  )
}
export default GlobalStack
