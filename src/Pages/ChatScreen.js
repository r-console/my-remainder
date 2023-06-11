import { useEffect, useState } from "react"
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
  FlatList,
} from "react-native"
import { Audio } from "expo-av"
import * as Speech from "expo-speech"
import { iconSize, submitButtonColor } from "../common/constant"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import Pay from "../../assets/pay.png"
import { FontAwesome } from "@expo/vector-icons"

const Message = [
  {
    id: "1",
    message: "New Note",
    code: 100,
  },
  {
    id: "2",
    message: "Add Payment",
    code: 101,
  },
]

const ChatScreen = () => {
  const [amt, setAmt] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [amtType, setType] = useState(0)
  const [previous, setPrevious] = useState([])

  const [myResponseArr, setMyResponseArr] = useState([])

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

  let FlatListRef = null

  const MyResponse = (res) => {
    let arr = myResponseArr
    arr.push(res)
    setMyResponseArr(arr)
    console.log(myResponseArr)
    console.log(res)
  }

  const Botmsg = ({ item }) => (
    <View style={{ padding: 5, display: "flex" }} key={item.id}>
      <TouchableOpacity
        style={styles.botmsgbox}
        onPress={() => MyResponse(item.message)}
      >
        <Text style={{ fontWeight: "600" }}>{item.message}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* <FlatList
        ref={(ref) => (FlatListRef = ref)}
        data={Message}
        inverted
        // onContentSizeChange={() => FlatListRef.scrollToEnd()}
        renderItem={({ item }) => <Botmsg item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        style={{ padding: 0, bottom: 65, marginTop: 60 }}
      /> */}
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Image
              source={require("../../assets/favicon.png")}
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#000",
                margin: 2,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginLeft: 3,
              }}
            >
              ChatBot
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 20,
            }}
          >
            {Message.map((item, i) => (
              <Botmsg item={item} key={i} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.chatBox}>
        <TextInput
          placeholder="Type message"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0, fontSize: 16 }}
          multiline
          //   onChangeText={(val) => hangleInputBox(val)}
        />
      </View>

      <TouchableOpacity style={styles.sendBox}>
        <FontAwesome
          name="send"
          size={20}
          color="#000"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  )
}
export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatBox: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "flex-start",
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    bottom: 15,
    borderRadius: 15,
    maxHeight: 60,
    marginLeft: 5,
  },
  sendBox: {
    //   alignSelf:'flex-end',
    //   maxWidth:'10%',
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    bottom: 15,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    // minWidth: 50,
    padding: 15,
  },
  recieveBox: {
    padding: 10,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  msg: {
    padding: 10,
    backgroundColor: "#2e64e5",
    borderRadius: 25,
    color: "#fff",
  },
  botmsgbox: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#80ccff",
  },
})
