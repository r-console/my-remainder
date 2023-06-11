import React from "react"
import { View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./Pages/HomeScreen"
import BottomTab from "./Nav/BottomTab"
import TodoDetails from "./Pages/TodoDetails"
import PaymentDetails from "./Pages/PaymentList"
import ChatScreen from "./Pages/ChatScreen"
import Payment from "./Pages/Payment"

const Stack = createStackNavigator()

const GlobalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Reminder" component={BottomTab} />
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
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: "Chat",
        })}
      />
      {/* current add payment method */}
      <Stack.Screen
        name="AddPay"
        component={Payment}
        options={({ route }) => ({
          title: "New Payment",
        })}
      />
      <Stack.Screen
        name="addtodo"
        component={HomeScreen}
        options={({ route }) => ({
          title: "New Payment",
        })}
      />
    </Stack.Navigator>
  )
}
export default GlobalStack
