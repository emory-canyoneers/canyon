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
import { HomeIcon, AnswerIcon, ProfileIcon } from "./src/components/Svg";
import { colors } from "./src/styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    function Home() {
        const tokenContext = useContext(AuthContext);
        const refactor = true; // remove once refactoring is done and skeleton pages are set up

        return (
            tokenContext[0] === null ? (
                <AuthPage />
            ) : (
                refactor ? (
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarActiveTintColor: colors.primary,
                            tabBarInactiveTintColor: colors.text, // todo: fix tinting
                            tabBarStyle: { 
                                backgroundColor: colors.background,
                                borderTopWidth: 0,
                            }}}
                    >
                        <Tab.Screen 
                            name="Your Groups"
                            component={LandingPage} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <HomeIcon />
                                )
                            }}/>
                        <Tab.Screen name="Select" component={Select} />
                        <Tab.Screen name="Answer" component={Answer} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <AnswerIcon />
                                )
                            }}/>
                        <Tab.Screen name="Responses" component={Responses} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <ProfileIcon />
                                )
                            }}/>
                        <Tab.Screen name="Issues" component={Issues} />
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Home" component={LandingPage} />
                        <Tab.Screen name="Answer" component={Answer} />
                        <Tab.Screen name="Profile" component={Responses} /> {/* need to set up profile page */}
                    </Tab.Navigator>
                )
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
