import {
  Alert,
  Button,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native"
import { buttonColor, submitButtonColor } from "../common/constant"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useContext, useEffect, useState } from "react"
// import DatePicker, { getFormatedDate } from "react-native-modern-datepicker"
import Todo from "../../assets/list.png"
import { AuthContext } from "../../AuthProvider"

const HomeScreen = () => {
  const [inputText, setInputText] = useState("")
  const [previous, setPrevious] = useState([])
  const { allCounts, setAllCounts, ctArr, setCtArr } = useContext(AuthContext)

  // for date picker
  // const today = new Date()
  // const startDate = getFormatedDate(
  //   today.setDate(today.getDate()),
  //   "DD/MM/YYYY"
  // )
  const [isSaved, setSaved] = useState(false)

  // date time picker
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(false)

  function handleChange(prop) {
    setDate(prop)
    console.log(prop)
  }

  const handleOnPress = () => {
    setOpen(!open)
  }

  const storeData = async (title, type) => {
    if (inputText === "") {
      ToastAndroid.show("Please type something", ToastAndroid.SHORT)
    } else {
      Alert.alert(title, "Are you sure?", [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              let arr = []
              const jsonValue1 = await AsyncStorage.getItem(type)
              const res = jsonValue1 != null ? JSON.parse(jsonValue1) : []
              arr = res
              setPrevious(res)
              // console.log(arr)
              console.log(inputText)
              arr.push(inputText)
              // console.log(arr)
              const jsonValue2 = JSON.stringify(arr)
              await AsyncStorage.setItem(type, jsonValue2)
              console.log("stored")
              ToastAndroid.show(inputText, ToastAndroid.SHORT)
              setInputText("")
              setSaved(true)
            } catch (e) {
              // saving error
            }
          },
        },
      ])
    }
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
      // console.log(res.length)
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
    getDataCounts(0, "important")
    getDataCounts(1, "thisweek")
    getDataCounts(2, "saturday")
    getDataCounts(3, "sunday")
    getDataCounts(4, "thismonth")
    getDataCounts(5, "monthend")
    getDataCounts(6, "others")
    setSaved(false)
  }

  useEffect(() => {
    if (isSaved) callFun()
  }, [isSaved])

  useEffect(() => {
    callFun()
  }, [])

  return (
    <View style={styles.container}>
      {/* this is for date picker */}
      {/* <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={date}
              onDateChange={handleChange}
            />
            <TouchableOpacity onPress={handleOnPress}>
              <Text style={{ padding: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={[
            styles.inputBox,
            {
              padding: 10,
              textAlignVertical: "top",
              fontSize: 18,
            },
          ]}
          numberOfLines={1}
          textAlign={"left"}
          autoFocus={true}
          returnKeyType={"none"}
          multiline={true}
          value={inputText}
          placeholder="Type your message...."
          onChangeText={(val) => setInputText(val)}
          onEndEditing={() => console.log("ending")}
        />
        {/* date picker */}
        {/* <View style={{ marginTop: 5 }}>
          <Button title={`Schedule Date ${date}`} onPress={handleOnPress} />
        </View> */}
        <View style={styles.ButtonBox}>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Important"
              style={styles.inputButton}
              color={submitButtonColor}
              onPress={() => storeData("Important", "important")}
            />
          </View>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Other Notes"
              style={styles.inputButton}
              color={submitButtonColor}
              onPress={() => storeData("Others", "others")}
            />
          </View>
        </View>
        {/* <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Week List"
              style={styles.inputButton}
              color={buttonColor}
              onPress={() => storeData("This week", "thisweek")}
            />
          </View>
        </View>
        <View style={styles.ButtonBox}>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Saturday"
              style={styles.inputButton}
              color={buttonColor}
              onPress={() => storeData("Saturday", "saturday")}
            />
          </View>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Sunday"
              style={styles.inputButton}
              color={buttonColor}
              onPress={() => storeData("Sunday", "sunday")}
            />
          </View>
        </View> */}
        {/* <View style={styles.ButtonBox}>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Month List"
              style={styles.inputButton}
              color={buttonColor}
              onPress={() => storeData("This Month", "thismonth")}
            />
          </View>
          <View style={{ alignSelf: "center", width: "49%" }}>
            <Button
              title="Month end"
              style={styles.inputButton}
              color={buttonColor}
              onPress={() => storeData("Month end", "monthend")}
            />
          </View>
        </View> */}

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
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputBox: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 150,
    borderRadius: 5,
    borderColor: "#999",
    borderWidth: 1,
  },
  ButtonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  Touchbutton: {
    backgroundColor: "red",
    width: "100%",
  },
  inputButton: {
    color: "#00cc00",
  },
  todoImg: {
    width: 230,
    height: 230,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputType: {
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    backgroundColor: "#ddd",
  },
})
