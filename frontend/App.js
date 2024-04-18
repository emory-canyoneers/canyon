import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import Select from "./Select";
import Answer from "./Answer";
import Responses from "./Responses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Issues from "./screens/Issues";
import AuthProvider from "./AuthProvider";
import AuthPage from "./screens/AuthPage";
import AuthContext from "./AuthContext";

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
