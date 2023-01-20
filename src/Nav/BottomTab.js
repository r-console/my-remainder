import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Pages/HomeScreen'
import ListPage from '../Pages/ListPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { iconSize, submitButtonColor } from '../common/constant'
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          headerShown: false,
          title:'',
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: "25%" }}>
              <MaterialIcons
                name="library-add"
                size={iconSize}
                style={{ alignSelf: "center" }}
                color={focused?submitButtonColor:'#666'}
              />
              <Text style={{ alignSelf: "center", color:focused?submitButtonColor:'#666', fontSize: 12, fontWeight:focused?'bold':'normal' }}>HOME</Text>
            </View>
          ),}} />
      <Tab.Screen name="List" component={ListPage}
      options={{
          headerShown: false,
          title:'',
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: "25%" }}>
              <FontAwesome5
                name="list-alt"
                size={iconSize}
                style={{ alignSelf: "center" }}
                color={focused?submitButtonColor:'#666'}
              />
              <Text style={{ alignSelf: "center", color:focused?submitButtonColor:'#666', fontSize: 12, fontWeight:focused?'bold':'normal' }}>TODO</Text>
            </View>
          ),}} />
    </Tab.Navigator>
  );
}

export default BottomTab