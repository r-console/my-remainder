import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Pages/HomeScreen'
import ListPage from '../Pages/ListPage'

const Tab = createMaterialTopTabNavigator();

const TopBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel:'Home' }} />
      <Tab.Screen name="List" component={ListPage} options={{ tabBarLabel:'TODO' }} />
    </Tab.Navigator>
  );
}

export default TopBar