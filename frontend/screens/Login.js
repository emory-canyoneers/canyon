import { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import { post_to } from '../api/fetch';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';


const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
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

        return (
            <View style={[styles.container, styles.background]}>
                {/* <ImageBackground source={require("../assets/background.png")} style={{width:Dimensions.get("screen").width, height:Dimensions.get("screen").height}}> */}
                    <View style={styles.textContainer}> 
                        <Text style={styles.text}>Welcome Back!</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor={'white'}
                            onChangeText={setUsername}
                            value={username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={'white'}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                            <TouchableOpacity style={styles.signup} onPress={() => {login()}}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.login} onPress={() => {login()}}>
                                <Text style={styles.buttonText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* </ImageBackground> */}
            </View>

                
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: '#1E2029',
    },
    textContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    login: {
        backgroundColor: 'white',
        width: "35%",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    signup: {
        backgroundColor: 'white',
        width: "55%",
        textAlign: "center",
        flexShrink: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default Login;
