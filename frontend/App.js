import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import Select from "./src/screens/Select";
import Answer from "./src/screens/Answer";
import Responses from "./old/Responses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './src/screens/Home';
import Issues from "./src/screens/Issues";
import { AuthProvider, AuthContext } from "./src/store/auth";
import AuthPage from "./src/screens/AuthPage";
import { HomeIcon, AnswerIcon, ProfileIcon } from "./src/components/Svg";
import { colors } from "./src/styles/colors";
import { InfoProvider } from "./src/store/info";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    function Content() {
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
                            tabBarInactiveTintColor: colors.text,
                            tabBarStyle: { 
                                backgroundColor: colors.background,
                                borderTopWidth: 0,
                            }}}
                    >
                        <Tab.Screen 
                            name="Home"
                            component={Home} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <HomeIcon color={color}/>
                                )
                            }}/>
                        <Tab.Screen name="Select" component={Select} />
                        <Tab.Screen name="Answer" component={Answer} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <AnswerIcon color={color}/>
                                )
                            }}/>
                        <Tab.Screen name="Issues" component={Issues} />
                        <Tab.Screen name="Responses" component={Responses} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <ProfileIcon color={color}/>
                                )
                            }}/>
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Home" component={Home} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <HomeIcon color={color}/>
                                )
                            }}/>
                        <Tab.Screen name="Answer" component={Answer} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <AnswerIcon color={color}/>
                                )
                            }}/>
                        <Tab.Screen name="Profile" component={Responses} 
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <ProfileIcon color={color}/>
                                )
                            }}/> {/* need to set up profile page */}
                    </Tab.Navigator>
                )
            )
        );
    }

    return (
        <AuthProvider>
            <InfoProvider>
                <NavigationContainer style={styles.appContainer}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Content" component={Content} />
                    </Stack.Navigator>
                </NavigationContainer>
            </InfoProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        alignItems: "center",
        backgroundColor: "#1E2029",
    },
});
