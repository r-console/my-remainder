import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Pressable,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react"
import Nothing from "../../assets/happy.png"
import Congrats from "../../assets/congrats.png"
import { AuthContext } from "../../AuthProvider"

const TodoDetails = ({ route }) => {
  const [storedData, setStoredData] = useState([])
  const { ctArr, setCtArr } = useContext(AuthContext)

  const [isDeleted, setDeleted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const type = route.params.type

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(type)
      const res = jsonValue != null ? JSON.parse(jsonValue) : []
      setStoredData(res)
      console.log(res)
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    console.log(type)
    getData()
  }, [])

  const deleteData = async (place, msg) =>
    Alert.alert("Is It Done?", msg.substring(0, 100), [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const reducedArr = [...storedData]
          reducedArr.splice(place, 1)
          setStoredData(reducedArr)
          try {
            const jsonValue2 = JSON.stringify(reducedArr)
            await AsyncStorage.setItem(type, jsonValue2)
            setDeleted(true)
            setModalVisible(true)
          } catch (err) {
            console.log(err)
          }
        },
      },
    ])

  const getDataCounts = async (index, type) => {
    try {
      const jsonValue = await AsyncStorage.getItem(type)
      const res = jsonValue != null ? JSON.parse(jsonValue) : []
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
    getDataCounts(0, "important")
    getDataCounts(1, "thisweek")
    getDataCounts(2, "saturday")
    getDataCounts(3, "sunday")
    getDataCounts(4, "thismonth")
    getDataCounts(5, "monthend")
    getDataCounts(6, "others")
    setDeleted(false)
  }

  useEffect(() => {
    console.log("counts")
    if (isDeleted) callFun()
  }, [isDeleted])

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={Congrats} style={{ width: 200, height: 200 }} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {storedData.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {storedData.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => deleteData(index, value)}
              style={styles.msgBox}
            >
              <Text style={styles.todo}>
                {index + 1}. {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            marginTop: -40,
          }}
        >
          <Image
            source={Nothing}
            style={{ width: 250, height: 250, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            No Schedule!!!
          </Text>
        </View>
      )}
    </View>
  )
}
export default TodoDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  todo: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  msgBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
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
  button: {
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})
