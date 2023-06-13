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
import knowledgeBase from "../common/Knowledge_base.json"

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

  // like python code
  const [userLastInput, setUserLastInput] = useState("")
  const [userInput, setUserInput] = useState("")
  const [botResponse, setBotResponse] = useState("")
  const [allMessages, setAllMessages] = useState([])

  const [sent, setSent] = useState(false)

  const loadKnowledgeBase = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("chats")
      const data = jsonData === null ? null : JSON.parse(jsonData)
      console.log(data)
      return data
    } catch (error) {
      console.error("Error loading knowledge base:", error)
      return null
    }
  }

  const findBestMatch = (userQuestion, questions) => {
    const matches = questions.filter((question) =>
      question.toLowerCase().includes(userQuestion.toLowerCase())
    )

    if (matches.length > 0) {
      return matches[0]
    }

    return null
  }

  const getAnswerForQuestion = (question, knowledgeBase) => {
    for (const q of knowledgeBase) {
      if (q.question === question) {
        return q.answer
      }
    }
    return null
  }

  const saveKnowledgeBase = async (data) => {
    try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem("chats", jsonData)
      console.log("Knowledge base saved successfully.")
      let arr = allMessages
      arr.push("Thank you. I learned new words!!")
      setUserLastInput("")
      setAllMessages(arr)
    } catch (error) {
      console.error("Error saving knowledge base:", error)
    }
  }

  const addQuestionAndAnswer = async (question, answer) => {
    let knowledgeBase = []
    let checkNull = await loadKnowledgeBase()

    if (checkNull === null) {
      knowledgeBase.push({
        question: question.toLowerCase(),
        answer: answer,
      })
    } else {
      knowledgeBase = await loadKnowledgeBase()
      knowledgeBase.push({
        question: question.toLowerCase(),
        answer: answer,
      })
    }

    saveKnowledgeBase(knowledgeBase)
  }

  const handleUserInput = async () => {
    let uin = userInput
    let arr = allMessages
    arr.push(uin)
    setAllMessages(arr)
    setSent(true)
    let knowledgeBase = await loadKnowledgeBase()
    if (knowledgeBase != null) {
      const bestMatch = findBestMatch(
        uin,
        knowledgeBase.map((q) => q.question)
      )

      if (bestMatch) {
        const answer = getAnswerForQuestion(bestMatch, knowledgeBase)
        let arr = allMessages
        arr.push(answer)
        setAllMessages(arr)
      } else {
        // when no match found in async storage
        let arr = allMessages
        arr.push(
          "I don't know the answer. Can you teach me? Type '101' to skip or type answer"
        )
        setUserLastInput(uin)
        setAllMessages(arr)
      }
    } else {
      // first time : if there is no data in async storage
      let arr = allMessages
      arr.push("I don't know the answer. Can you teach me?")
      setUserLastInput(uin)
      setAllMessages(arr)
    }
    setUserInput("")
  }

  useEffect(() => {
    const d = loadKnowledgeBase()
    console.log(d)
    if (sent) setSent(false)
  }, [sent])

  const handleTeachBot = () => {
    let uin = userInput
    if (uin == "101" || uin == "101 " || uin == 101) {
      let arr = allMessages
      arr.push(uin)
      arr.push("You skipped")
      setAllMessages(arr)
      setSent(true)
      setUserInput("")
      setUserLastInput("")
    } else {
      let arr = allMessages
      arr.push(uin)
      setAllMessages(arr)
      setSent(true)
      addQuestionAndAnswer(userLastInput, uin)
      setUserInput("")
    }
  }

  const renderItem = ({ item, index }) => {
    return index % 2 == 0 ? (
      <View
        style={{
          width: "80%",
          alignSelf: "flex-end",
          marginBottom: 5,
          justifyContent: "flex-end",
        }}
        key={index}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              alignSelf: "flex-end",
              padding: 7,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#ccc",
              backgroundColor: "#66e0ff",
              elevation: 3,
            }}
          >
            {item}
          </Text>
        </View>
      </View>
    ) : (
      <View style={{ width: "80%" }} key={index}>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#ccc",
              padding: 7,
              marginBottom: 5,
              backgroundColor: "#00ffcc",
              elevation: 3,
            }}
          >
            {item}
          </Text>
        </View>
      </View>
    )
  }
  const renderFooter = () => {
    return <View style={{ height: 10 }}></View>
  }

  const renderHeader = () => {
    return (
      <View style={{ width: "80%" }}>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#ccc",
              padding: 7,
              marginBottom: 5,
              backgroundColor: "#00ffcc",
              elevation: 3,
            }}
          >
            Welcome to the Chat Bot!!
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => (FlatListRef = ref)}
        data={allMessages}
        // inverted
        onContentSizeChange={() => FlatListRef.scrollToEnd()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        style={{ padding: 10, bottom: 65, marginTop: 60 }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
      {/* <ScrollView>
        <View>
          {allMessages.map((item, i) => (
            <>
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
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "600" }}>{item}</Text>
              </View>
            </>
          ))}
        </View>
      </ScrollView> */}
      <View style={styles.chatBox}>
        <TextInput
          placeholder="Type message"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0, fontSize: 16 }}
          multiline
          value={userInput}
          onChangeText={(val) => setUserInput(val)}
          //   onChangeText={(val) => hangleInputBox(val)}
        />
      </View>
      {/* <Button onPress={handleUserInput} title="Submit" />
      <Button onPress={handleTeachBot} title="Teach Me" /> */}

      <TouchableOpacity
        style={styles.sendBox}
        onPress={() => {
          if (userInput != "") {
            if (userLastInput === "") {
              handleUserInput()
            } else {
              handleTeachBot()
            }
          } else {
            ToastAndroid.show("Please type your message!", ToastAndroid.SHORT)
          }
        }}
      >
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
