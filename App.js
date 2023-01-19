import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStack from './src/GlobalStack'
import TopBar from './src/Nav/TopBar'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <GlobalStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
