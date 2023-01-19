import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { iconSize, textSize } from "../common/constant"
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ListPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Today'})}>
                    <Text style={{ fontSize: textSize }}>
                        <Ionicons name="today" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}Today</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'This Week'})}>
                    <Text style={{ fontSize: textSize }}>
                        <MaterialIcons name="view-week" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}This Week</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Saturday'})}>
                    <Text style={{ fontSize: textSize }}>
                        <MaterialCommunityIcons name="calendar-weekend" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}Saturday</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Sunday'})}>
                    <Text style={{ fontSize: textSize }}>
                        <MaterialCommunityIcons name="calendar-weekend" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}Sunday</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'This Month'})}>
                    <Text style={{ fontSize: textSize }}>
                        <MaterialCommunityIcons name="calendar-month" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}This Month</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Todo', {title:'Month End'})}>
                    <Text style={{ fontSize: textSize }}>
                        <Ionicons name="ios-calendar" size={iconSize} color="black" style={{alignSelf:'center'}} />
                        {` `}Month End</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={iconSize} color="black" style={{alignSelf:'center'}} />
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
    }
})