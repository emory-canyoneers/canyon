import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { PreviousIcon, HomeIcon, ProfileIcon, AnswerIcon } from "./src/components/Svg";
import AnswerPage from "./src/screens/AnswerPage";
import AuthPage from "./src/screens/AuthPage";
import Home from './src/screens/Home';
import ProfilePage from "./src/screens/ProfilePage";
import ResponsesPage from "./src/screens/ResponsesPage";
import { AuthContext, AuthProvider } from "./src/store/auth";
import { InfoProvider } from "./src/store/info";
import { SelfProvider } from "./src/store/self";
import { colors } from "./src/styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    function Content() {
        const tokenContext = useContext(AuthContext);

        return (
            tokenContext[0] === null ? (
                <AuthPage />
            ) : (
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: colors.primary,
                        tabBarInactiveTintColor: colors.text,
                        tabBarStyle: { 
                            backgroundColor: colors.background,
                            borderTopWidth: 0,
                    }}}>
                    <Tab.Screen name="Home" component={Home} 
                        options={{
                            tabBarIcon: ({ color }) => (
                                <HomeIcon color={color}/>
                            )
                        }}/>
                    <Tab.Screen name="Answer" component={AnswerPage} 
                        options={{
                            tabBarIcon: ({ color }) => (
                                <AnswerIcon color={color}/>
                            )
                        }}/>
                    <Tab.Screen name="Responses" component={ResponsesPage}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <PreviousIcon color={color}/>
                            )
                        }}/>
                    <Tab.Screen name="Profile" component={ProfilePage} 
                        options={{
                            tabBarIcon: ({ color }) => (
                                <ProfileIcon color={color}/>
                            )
                        }}/>
                </Tab.Navigator>
            )
        );
    }

    return (
        <AuthProvider>
        <SelfProvider>
        <InfoProvider>
            <NavigationContainer style={styles.appContainer}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Content" component={Content} />
                </Stack.Navigator>
            </NavigationContainer>
        </InfoProvider>
        </SelfProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        alignItems: "center",
        backgroundColor: "#1E2029",
    },
});
