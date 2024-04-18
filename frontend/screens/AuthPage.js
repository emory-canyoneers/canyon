import { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import { colors } from '../styles/colors';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';


export default AuthPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [signup, setSignup] = useState(false);
        const tokenContext = useContext(AuthContext);


        const login = async () => {
            const url = "http://joincanyon.org/auth";
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": username,
                    "password": password
                })
            };
            const response = await fetch(url, options)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}\nResponse: ${response}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    return data;
                })
            
            tokenContext[1](response.token)
            return;
        };

        const signUp = async () => {
            const url = "http://joincanyon.org/users";
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": `{firstName} {lastName}`,
                    "email": username,
                    "password": password
                })
            };
            const response = await fetch(url, options)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}\nResponse: ${response}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    return data;
                })
            
            tokenContext[1](response.token)
            return;
        }

        return (
            <View style={styles.body}>
                {/* <ImageBackground source={require("../assets/background.png")} style={{width:Dimensions.get("screen").width, height:Dimensions.get("screen").height}}> */}
                    <View style={styles.content}> 
                        {
                            signup ? (
                                <Text style={styles.heading}>Join the Conversation!</Text>
                            ) : (
                                <Text style={styles.heading}>Welcome Back!</Text>
                            )
                        }

                        {
                            signup ? (
                                <View style={styles.horizontalWrapper}>
                                    <TextInput
                                        style={styles.name}
                                        placeholder="First"
                                        placeholderTextColor={colors.inputPlaceholder}
                                        onChangeText={setFirstName}
                                        value={firstName}
                                    />
                                    <TextInput
                                        style={styles.name}
                                        placeholder="Last"
                                        placeholderTextColor={colors.inputPlaceholder}
                                        onChangeText={setLastName}
                                        value={lastName}
                                    />
                                </View>
                            ) : (
                                <></>
                            )
                        }

                        <TextInput
                            style={styles.credentials}
                            placeholder="Username"
                            placeholderTextColor={colors.inputPlaceholder}
                            onChangeText={setUsername}
                            value={username}
                        />
                        <TextInput
                            style={styles.credentials}
                            placeholder="Password"
                            placeholderTextColor={colors.inputPlaceholder}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            signup ? signUp() : login()
                        }}>
                            {
                                signup ? (
                                    <Text>Sign Up</Text>
                                ) : (
                                    <Text>Log In</Text>
                                )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {setSignup((curr) => !curr)}}>
                            {
                                signup ? (
                                    <Text style={styles.link}>Already have an account? Log in</Text>
                                ) : (
                                    <Text style={styles.link}>Don't have an account? Sign up</Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                {/* </ImageBackground> */}
            </View>

                
        );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    content: {
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '50%',
    },
    horizontalWrapper: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    heading: {
        color: colors.textMain,
        fontSize: 24,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.inputText,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    credentials: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.inputText,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.button,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    link: {
        color: colors.textSecondary,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // background: {
    //     backgroundColor: '#1E2029',
    // },
    // textContainer: {
    //     flex: 1,
    //     height: '100%',
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // text: {
    //     fontSize: 24,
    //     color: 'white',
    //     fontWeight: 'bold',
    //     marginBottom: 20,
    // },
    // input: {
    //     width: '80%',
    //     height: 40,
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     color: 'white',
    //     borderRadius: 5,
    //     paddingHorizontal: 10,
    //     marginBottom: 10,
    // },
    // login: {
    //     backgroundColor: 'white',
    //     width: "35%",
    //     textAlign: "center",
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 5,
    // },
    // signup: {
    //     backgroundColor: 'white',
    //     width: "55%",
    //     textAlign: "center",
    //     flexShrink: 0,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 5,
    // },
    // buttonText: {
    //     fontSize: 18,
    //     color: 'black',
    //     fontWeight: 'bold',
    // },
});
