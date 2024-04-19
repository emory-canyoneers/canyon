import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import Select from "./src/screens/Select";
import Answer from "./src/screens/Answer";
import Responses from "./old/Responses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingPage from './src/screens/LandingPage';
import Issues from "./src/screens/Issues";
import AuthProvider from "./src/store/AuthProvider";
import AuthPage from "./src/screens/AuthPage";
import AuthContext from "./src/store/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function Home() {
    const tokenContext = useContext(AuthContext);

    return (
      tokenContext[0] === null ? (
        <AuthPage /> 
      ) : (
       <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Your Groups" component={LandingPage} />
        <Tab.Screen name="Select" component={Select} />
        <Tab.Screen name="Answer" component={Answer} />
        <Tab.Screen name="Responses" component={Responses} />
        <Tab.Screen name="Issues" component={Issues} />
      </Tab.Navigator>
      )
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer style={styles.appContainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    alignItems: "center",
    backgroundColor: "#1E2029",
  },
});
