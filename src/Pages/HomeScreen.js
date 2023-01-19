import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { buttonColor, submitButtonColor } from "../common/constant"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react"

const HomeScreen = () => {
    const [inputText, setInputText] = useState('')
    const [previous, setPrevious] = useState([])

    const fetchPrev = async (type) => {
        const jsonValue1 = await AsyncStorage.getItem(type)
        return jsonValue1 != null ? JSON.parse(jsonValue1) : null;
    }

    const storeData = async (type) => {
        console.log(previous)
        try {
            let arr = []
            const fres = fetchPrev(type);
            if (fres !== null) {
                arr = fres
                setPrevious(fres)
            }
            console.log(arr)
            console.log(inputText)
            arr.push('hi')
            // const jsonValue2 = JSON.stringify(arr)
            // await AsyncStorage.setItem(type, jsonValue2)
            console.log('stored')
            console.log(arr)
        } catch (e) {
            // saving error
        }
    }
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                    style={[styles.inputBox, {
                        padding: 10,
                        textAlignVertical: 'top',
                        fontSize: 18
                    }]}
                    numberOfLines={1}
                    textAlign={'left'}
                    returnKeyType={'none'}
                    multiline={true}
                    onChangeText={(val)=>setInputText(val)}
                />
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Today" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('today')} />
                    </View>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="This Week" style={styles.inputButton} color={buttonColor} />
                    </View>
                </View>
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Saturday" style={styles.inputButton} color={buttonColor} />
                    </View>
                    <View style={{ alignSelf: 'center', width: '49%' }}>
                        <Button title="Sunday" style={styles.inputButton} color={buttonColor} />
                    </View>
                </View>
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="This Month" style={styles.inputButton} color={buttonColor} />
                    </View>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Month end" style={styles.inputButton} color={buttonColor} />
                    </View>
                </View>
                {/* <View style={{width:'100%',marginTop:10}}>
                    <Button title="Add" style={styles.inputButton} color={submitButtonColor} />
                </View> */}
            </ScrollView>
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10
    },
    inputBox: {
        backgroundColor: '#ddd',
        width: '100%',
        height: 200,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    ButtonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10
    },
    Touchbutton: {
        backgroundColor: 'red',
        width:'100%'
    },
    inputButton: {
        color:'#00cc00'
    }
})