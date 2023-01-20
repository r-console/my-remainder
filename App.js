import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStack from './src/GlobalStack'
import { AuthContext } from "./AuthProvider"
import { useMemo, useState } from 'react'

export default function App() {
  const [allCounts, setAllCounts] = useState({
    TodayCount:0,
    ThisweekCount: 0,
    SaturdayCount: 0,
    SundayCount: 0,
    ThisMonthCount: 0,
    MonthEndCount: 0,
    OthersCount: 0
  })

  const [ctArr, setCtArr] = useState([])

  const authContext = useMemo(() => ({
    allCounts,
    setAllCounts,
    ctArr,
    setCtArr
  }))

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      <GlobalStack/>
      </NavigationContainer>
      </AuthContext.Provider>
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
