import { useState } from "react"
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Button,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native"
import { iconSize, submitButtonColor } from "../common/constant"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import Pay from "../../assets/pay.png"

const Payment = () => {
  const [amt, setAmt] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [amtType, setType] = useState(0)
  const [previous, setPrevious] = useState([])

  const storeData = async (title, type) => {
    if (amt === "" || name === "" || message === "" || amtType === 0) {
      ToastAndroid.show("Please fill the details", ToastAndroid.SHORT)
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
              let obj = {
                amt,
                name,
                message,
                amtType,
              }
              // console.log(arr)
              console.log(obj)
              arr.push(obj)
              // console.log(arr)
              const jsonValue2 = JSON.stringify(arr)
              await AsyncStorage.setItem(type, jsonValue2)
              console.log("stored")
              ToastAndroid.show("Saved", ToastAndroid.SHORT)
              setAmt("")
              setName("")
              setMessage("")
              setType(0)
            } catch (e) {
              // saving error
            }
          },
        },
      ])
    }
  }

  return (
    <View style={styles.container}>
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
          returnKeyType={"none"}
          keyboardType="number-pad"
          value={amt}
          placeholder="Enter Amount...."
          onChangeText={(val) => setAmt(val)}
        />
        <TextInput
          style={[
            styles.inputBox2,
            {
              padding: 10,
              textAlignVertical: "top",
              fontSize: 18,
            },
          ]}
          numberOfLines={1}
          textAlign={"left"}
          returnKeyType={"none"}
          multiline={true}
          value={name}
          placeholder="Enter Name"
          onChangeText={(val) => setName(val)}
        />
        <TextInput
          style={[
            styles.inputBox3,
            {
              padding: 10,
              textAlignVertical: "top",
              fontSize: 18,
            },
          ]}
          numberOfLines={1}
          textAlign={"left"}
          returnKeyType={"none"}
          multiline={true}
          value={message}
          placeholder="Type your message...."
          onChangeText={(val) => setMessage(val)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ width: "49%" }}
            onPress={() => {
              if (amtType === 1) {
                setType(0)
              } else {
                setType(1)
              }
            }}
          >
            <Text
              style={[
                styles.inputType,
                {
                  backgroundColor: amtType === 1 ? "#f44336" : "#ddd",
                  color: amtType === 1 ? "#fff" : "#000",
                },
              ]}
            >
              Debt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "49%" }}
            onPress={() => {
              if (amtType === 2) {
                setType(0)
              } else {
                setType(2)
              }
            }}
          >
            <Text
              style={[
                styles.inputType,
                {
                  backgroundColor: amtType === 2 ? "green" : "#ddd",
                  color: amtType === 2 ? "#fff" : "#000",
                },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", marginTop: 5 }}>
          <Button
            title="Submit"
            style={styles.inputButton}
            color={submitButtonColor}
            onPress={() => storeData("Payment Details", "payment")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Image source={Pay} style={styles.todoImg} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Add Payment Reminder
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
export default Payment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
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
  inputBox: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 5,
  },
  inputBox2: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 5,
  },
  inputBox3: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#000",
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
    width: 250,
    height: 250,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    resizeMode: "contain",
  },
})
