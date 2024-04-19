//Access the token at any point throughout the application 
//Run the token through as an object, thus modified throughout each time you access it
// 

// Token is a state, every time it's updated relevant features will be updated on screen
// Token is stored in AuthContext, which is used in AuthProvider and wraps the entire application
// 

import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const tokenContext = useContext(AuthContext); // useContext provides AuthProvider's value -> array of [token, setToken] which are React states


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
        <View style={styles.container}>
        <View style={[styles.gradientContainer, styles.orange]} />
        <View style={[styles.gradientContainer, styles.red]} />
        <View style={styles.textContainer}> 
            <Text style={styles.text}>Welcome Back!</Text>
            <TextInput //username entry
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput //password box
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => {login()}}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text>
                {tokenContext[0]}
            </Text>
        </View>
    </View>

        
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradientContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    orange: {
      backgroundColor: 'orange',
    },
    red: {
      backgroundColor: 'red',
      opacity: 0.5,
    },
    textContainer: {
      flex: 1,
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
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
    },
    loginLink: {
      marginTop: 10,
      color: 'white',
      textDecorationLine: 'underline',
    },
  });

export default Login;
