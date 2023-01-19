import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react"

const TodoDetails = () => {
    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const res = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(res)
        } catch(e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData();
    },[])


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity>
                    <Text style={styles.todo}>1. We already have the Home component from previous chapters; now, we need to add the About component. We will add the goToAbout and the goToHome functions to switch between scenes.</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.todo}>2. Text</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default TodoDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    todo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical:10
    }
})