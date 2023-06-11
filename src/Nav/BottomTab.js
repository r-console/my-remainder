import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import HomeScreen from "../Pages/HomeScreen"
import ListPage from "../Pages/ListPage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text, View } from "react-native"
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { iconSize, submitButtonColor } from "../common/constant"
import { MaterialIcons } from "@expo/vector-icons"
import Payment from "../Pages/Payment"

const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="List"
        component={ListPage}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: "25%" }}>
              <Feather
                name="home"
                size={iconSize}
                style={{ alignSelf: "center" }}
                color={focused ? submitButtonColor : "#666"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  color: focused ? submitButtonColor : "#666",
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: "25%" }}>
              <FontAwesome5
                name="list-alt"
                size={iconSize}
                style={{ alignSelf: "center" }}
                color={focused ? submitButtonColor : "#666"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  color: focused ? submitButtonColor : "#666",
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                New Todo
              </Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault()
            // Do something with the `navigation` object
            navigation.navigate("addtodo")
          },
        })}
      />
      <Tab.Screen
        name="Pay"
        component={Payment}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: "25%" }}>
              <Ionicons
                name="card-outline"
                size={iconSize}
                style={{ alignSelf: "center" }}
                color={focused ? submitButtonColor : "#666"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  color: focused ? submitButtonColor : "#666",
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                New Payment
              </Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault()
            // Do something with the `navigation` object
            navigation.navigate("AddPay")
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default BottomTab
