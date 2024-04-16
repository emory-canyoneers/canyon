import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingPage from './LandingPage';
import Select from "./Select";
import Answer from "./Answer";
import Submitted from "./Submitted";
import Responses from "./Responses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function Home() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Your Groups" component={LandingPage} />
        <Tab.Screen name="Select" component={Select} />
        <Tab.Screen name="Answer" component={Answer} />
        <Tab.Screen name="Responses" component={Responses} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer style={styles.appContainer}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Submitted" component={Submitted} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "#1E2029",
    // justifyContent: 'center',
  },
});
