import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { iconSize, submitButtonColor, textSize } from "../common/constant"
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  EvilIcons,
} from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Todo from "../../assets/todo.png"
import { AuthContext } from "../../AuthProvider"

const ListPage = ({ navigation }) => {
  const { allCounts, ctArr, setCtArr } = useContext(AuthContext)

  // amount details not stored in global variable (context)
  const [amountData, setAmountData] = useState([])
  const [debtAmt, setDebtAmt] = useState(0)
  const [inAmt, setInAmt] = useState(0)
  useEffect(() => {
    // console.log(allCounts)
  }, [allCounts])

  const getPayment = async () => {
    const jsonValue = await AsyncStorage.getItem("payment")
    const res = jsonValue != null ? JSON.parse(jsonValue) : []

    let debt = 0
    let income = 0
    res.forEach((element) => {
      if (element.amtType === 1) {
        debt += parseInt(element.amt)
      }
      if (element.amtType === 2) {
        income += parseInt(element.amt)
      }
    })
    setDebtAmt(debt)
    setInAmt(income)
  }

  const getDataCounts = async (index, type) => {
    try {
      const jsonValue = await AsyncStorage.getItem(type)
      const res = jsonValue != null ? JSON.parse(jsonValue) : []
      // if(type === 'today') setAllCounts({...allCounts, TodayCount:res.length})
      // if(type === 'thisweek') setAllCounts({...allCounts, ThisweekCount:res.length})
      // if(type === 'saturday') setAllCounts({...allCounts, SaturdayCount:res.length})
      // if(type === 'sunday') setAllCounts({...allCounts, SundayCount:res.length})
      // if(type === 'thismonth') setAllCounts({...allCounts, ThisMonthCount:res.length})
      // if(type === 'monthend') setAllCounts({...allCounts, MonthEndCount:res.length})
      // if(type === 'others') setAllCounts({...allCounts, OthersCount:res.length})
      let arr = []
      arr = ctArr
      arr[index] = res.length
      setCtArr(arr)
    } catch (e) {
      // error reading value
    }
  }

  const callFun = () => {
    getDataCounts(0, "important")
    getDataCounts(1, "thisweek")
    getDataCounts(2, "saturday")
    getDataCounts(3, "sunday")
    getDataCounts(4, "thismonth")
    getDataCounts(5, "monthend")
    getDataCounts(6, "others")
  }
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    callFun()
    getPayment()
  }, [])

  // delete button id
  const [deleteShow, setDeleteShow] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      callFun()
      getPayment()
      setRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {}, [refreshCount])

  const deleteAllStorageData = async () =>
    Alert.alert(
      "Is It Done?",
      "Are you sure to delete complete chat history?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("chats")
            } catch (err) {
              console.log(err)
            }
          },
        },
      ]
    )

  return (
    <View style={styles.container}>
      {refreshCount === 6 && (
        <View style={{ position: "absolute", bottom: 15, left: 15, zIndex: 9 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              padding: 5,
              borderRadius: 50,
            }}
            onPress={() => deleteAllStorageData()}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color={"#000"}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ position: "absolute", bottom: 15, right: 15, zIndex: 9 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            padding: 5,
            borderRadius: 50,
          }}
          onPress={() => {
            if (refreshCount === 6) {
              setDeleteShow(false)
              setRefreshCount(0)
            } else {
              setRefreshCount(refreshCount + 1)
            }
            onRefresh()
          }}
        >
          <MaterialIcons
            name="refresh"
            size={20}
            color={"#000"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 25,
          zIndex: 9,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#00ace6",
            borderWidth: 1,
            borderRadius: 50,
            borderColor: "#999",
            padding: 10,
          }}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons
            name="md-chatbox-ellipses"
            size={25}
            color={"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Payment</Text>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("paymentDetails", {
              title: "Payments",
              type: "payment",
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="arrow-up-circle"
              size={iconSize}
              color={"green"}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize, color: "#777" }}>
              {` `}Income
            </Text>
            <Text
              style={{
                fontSize: textSize,
                fontWeight: "bold",
                color: inAmt === 0 ? "#777" : "green",
              }}
            >
              {" "}
              {inAmt}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="arrow-down-circle"
              size={iconSize}
              color={"#f44336"}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize, color: "#777" }}>{` `}Debt</Text>
            <Text
              style={{
                fontSize: textSize,
                fontWeight: "bold",
                color: debtAmt === 0 ? "#777" : "#000",
              }}
            >
              {" "}
              {debtAmt}
            </Text>
          </View>
        </TouchableOpacity>
        <Text>ToDo and Notes</Text>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", {
              title: "Important",
              type: "important",
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="priority-high"
              size={iconSize}
              color={"red"}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Important</Text>
          </View>
          <Text style={styles.countText}>{ctArr[0] !== 0 ? ctArr[0] : ""}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", { title: "Others", type: "others" })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="message"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Other Notes</Text>
          </View>
          <Text style={styles.countText}>{ctArr[6] !== 0 ? ctArr[6] : ""}</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Image source={Todo} style={styles.todoImg} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Add Work List
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
              paddingVertical: 15,
            }}
          >
            Developer Ramesh
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
export default ListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  countText: {
    alignSelf: "center",
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  todoImg: {
    width: 230,
    height: 230,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    resizeMode: "contain",
  },
})
