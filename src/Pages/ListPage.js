import React, { useCallback, useContext, useEffect, useState } from "react"
import {
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
import Todo from "../../assets/list.png"
import { AuthContext } from "../../AuthProvider"

const ListPage = ({ navigation }) => {
  const { allCounts, ctArr, setCtArr } = useContext(AuthContext)

  // amount details not stored in global variable (context)
  const [amountData, setAmountData] = useState([])
  const [debtAmt, setDebtAmt] = useState(0)
  const [inAmt, setInAmt] = useState(0)
  useEffect(() => {
    console.log("allCounts")
    console.log(allCounts)
  }, [allCounts])

  const getPayment = async () => {
    const jsonValue = await AsyncStorage.getItem("payment")
    const res = jsonValue != null ? JSON.parse(jsonValue) : []
    console.log(res)

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
    console.log(debt)
    setDebtAmt(debt)
    console.log(income)
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
      console.log(res.length)
      let arr = []
      arr = ctArr
      arr[index] = res.length
      setCtArr(arr)
      console.log(ctArr)
    } catch (e) {
      // error reading value
    }
  }

  const callFun = () => {
    console.log("counts")
    getDataCounts(0, "today")
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

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      callFun()
      getPayment()
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", bottom: 15, right: 15, zIndex: 9 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#333", padding: 7, borderRadius: 10 }}
          onPress={() => onRefresh()}
        >
          <EvilIcons
            name="refresh"
            size={30}
            color={"#ddd"}
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
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        <Text>ToDo</Text>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", { title: "Today", type: "today" })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="today"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Today</Text>
          </View>
          <Text style={styles.countText}>{ctArr[0] !== 0 ? ctArr[0] : ""}</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", {
              title: "This Week",
              type: "thisweek",
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="view-week"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Week List</Text>
          </View>
          <Text style={styles.countText}>{ctArr[1] !== 0 ? ctArr[1] : ""}</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", { title: "Saturday", type: "saturday" })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="calendar-weekend"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Saturday</Text>
          </View>
          <Text style={styles.countText}>{ctArr[2] !== 0 ? ctArr[2] : ""}</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", { title: "Sunday", type: "sunday" })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="calendar-weekend"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Sunday</Text>
          </View>
          <Text style={styles.countText}>{ctArr[3] !== 0 ? ctArr[3] : ""}</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", {
              title: "This Month",
              type: "thismonth",
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}This Month</Text>
          </View>
          <Text style={styles.countText}>{ctArr[4] !== 0 ? ctArr[4] : ""}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate("Todo", {
              title: "Month End",
              type: "monthend",
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-calendar"
              size={iconSize}
              color={submitButtonColor}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: textSize }}>{` `}Month End</Text>
          </View>
          <Text style={styles.countText}>{ctArr[5] !== 0 ? ctArr[5] : ""}</Text>
        </TouchableOpacity> */}
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
    marginTop: -20,
    resizeMode: "contain",
  },
})
