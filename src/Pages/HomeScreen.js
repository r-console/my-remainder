import { Alert, Button, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { buttonColor, submitButtonColor } from "../common/constant"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useContext, useEffect, useState } from "react"
import Todo from '../../assets/todo.png'
import { AuthContext } from "../../AuthProvider"

const HomeScreen = () => {
    const [inputText, setInputText] = useState('')
    const [previous, setPrevious] = useState([])
    const { allCounts, setAllCounts, ctArr, setCtArr } = useContext(AuthContext)

    const [isSaved, setSaved] = useState(false)

    const storeData = async (title, type) => {
        if (inputText === '') {
            ToastAndroid.show('Please type something', ToastAndroid.SHORT)
        }
        else {
            Alert.alert(title, 'Are you sure?', [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
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
                            console.log('stored')
                            ToastAndroid.show(inputText, ToastAndroid.SHORT)
                            setInputText('')
                            setSaved(true)
                        } catch (e) {
                            // saving error
                        }
                    }
                },
            ])
        }
    }

    const getDataCounts = async (index, type) => {
        try {
            const jsonValue = await AsyncStorage.getItem(type)
            const res = jsonValue != null ? JSON.parse(jsonValue) : [];
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
        } catch(e) {
            // error reading value 
        }
    }

    const callFun = () => {
        console.log('counts')
        getDataCounts(0,'today');
        getDataCounts(1,'thisweek');
        getDataCounts(2,'saturday');
        getDataCounts(3,'sunday');
        getDataCounts(4,'thismonth');
        getDataCounts(5,'monthend');
        getDataCounts(6,'others');
        setSaved(false)
    }

    useEffect(() => {
        if(isSaved) callFun()
    }, [isSaved])

    useEffect(() => {
        callFun()
    }, [])

    
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
                    value={inputText}
                    placeholder='Type your message....'
                    onChangeText={(val)=>setInputText(val)}
                />
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Today" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('Today','today')} />
                    </View>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="This Week" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('This week','thisweek')} />
                    </View>
                </View>
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Saturday" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('Saturday','saturday')} />
                    </View>
                    <View style={{ alignSelf: 'center', width: '49%' }}>
                        <Button title="Sunday" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('Sunday','sunday')} />
                    </View>
                </View>
                <View style={styles.ButtonBox}>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="This Month" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('This Month','thismonth')} />
                    </View>
                    <View style={{alignSelf:'center',width:'49%'}}>
                        <Button title="Month end" style={styles.inputButton} color={buttonColor} onPress={()=>storeData('Month end','monthend')} />
                    </View>
                </View>
                <View style={{width:'100%',marginTop:10}}>
                    <Button title="Others" style={styles.inputButton} color={submitButtonColor} onPress={()=>storeData('Others','others')}/>
                </View>
                
                <View style={{flex:1}}>
                    <Image source={Todo} style={styles.todoImg} />
                    <Text style={{fontSize:20,fontWeight:'bold', textAlign:'center',marginTop:15}}>Add Your List</Text>
                    <Text style={{fontSize:12,fontWeight:'bold', textAlign:'center',paddingVertical:15}}>Developer Ramesh</Text>
                </View>
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
        height: 150,
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
    },
    todoImg: {
        width: 170,
        height: 170,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
    }
})