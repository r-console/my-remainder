import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { iconSize, submitButtonColor, textSize } from "../common/constant"
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../AuthProvider"

const ListPage = ({ navigation }) => {    
    const { allCounts, ctArr, setCtArr } = useContext(AuthContext)
    useEffect(() => {
        console.log('allCounts')
        console.log(allCounts)
    }, [allCounts])

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
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            callFun()
            setRefreshing(false);
        }, 1000);
    }, []);
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Todo', { title: 'Today', type: 'today' })}>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="today" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} />
                        <Text style={{ fontSize: textSize }}>{` `}Today</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[0]!==0?ctArr[0]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Todo', { title: 'This Week', type: 'thisweek' })}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name="view-week" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} />
                        <Text style={{ fontSize: textSize }}>{` `}This Week</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[1]!==0?ctArr[1]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Todo', { title: 'Saturday', type: 'saturday' })}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name="calendar-weekend" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} />
                        <Text style={{ fontSize: textSize }}>{` `}Saturday</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[2]!==0?ctArr[2]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Sunday', type:'sunday'})}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name="calendar-weekend" size={iconSize} color={submitButtonColor} style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: textSize }}>{` `}Sunday</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[3]!==0?ctArr[3]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'This Month', type:'thismonth'})}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name="calendar-month" size={iconSize} color={submitButtonColor} style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: textSize }}>{` `}This Month</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[4]!==0?ctArr[4]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Todo', { title: 'Month End', type: 'monthend' })}>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="ios-calendar" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} />
                        <Text style={{ fontSize: textSize }}>{` `}Month End</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[5]!==0?ctArr[5]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Others', type:'others'})}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name="message" size={iconSize} color={submitButtonColor} style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: textSize }}>{` `}Others</Text>
                    </View>
                    <Text style={styles.countText}>{ctArr[6]!==0?ctArr[6]:''}</Text>
                    {/* <MaterialIcons name="keyboard-arrow-right" size={iconSize} color={submitButtonColor} style={{alignSelf:'center'}} /> */}
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default ListPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    box: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:5
    },
    countText: {
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontWeight:'bold'
    }
})