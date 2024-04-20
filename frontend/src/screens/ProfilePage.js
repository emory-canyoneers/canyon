import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { styles } from '../styles/ProfilePage';
import { colors } from '../styles/colors';
import { SelfContext } from '../store/self';
import { AuthContext } from '../store/auth';
import { InfoContext } from '../store/info';

export default ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setGroups = useContext(InfoContext)[1];
    const self = useContext(SelfContext)[0];
    const setSelf = useContext(SelfContext)[1];
    const token = useContext(AuthContext)[0];
    const setToken = useContext(AuthContext)[1];

    const fetchGroups = async () => {
        const url = `http://joincanyon.org/groups`;
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token,
            }
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setGroups(response);
    };

    const fetchSelf = async () => {
        const url = `http://joincanyon.org/users`;
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token,
            }
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setSelf(response);
    };

    const updateProfile = async () => {
        const url = "http://joincanyon.org/users";
        const update = {};
        if (name !== self.name) {
            update.name = name;
        }
        if (email !== self.email) {
            update.email = email;
        }
        if (password !== '') {
            update.password = password;
        }
        if (Object.keys(update).length === 0) {
            return;
        }
        const options = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(update)
        };
        const response = await fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}\nResponse: ${JSON.stringify(response)}`);
                }
                return response.json();
            })
            .then((data) => {
                return data;
            });
        
        setToken(response.token);
        fetchGroups();
        fetchSelf();
        setPassword('');
        return;
    }

    useEffect(() => {
        setName(self.name);
        setEmail(self.email);
    }, [self]);

    return (
        <View style={styles.container}>
            <View style={styles.loginContent}>
                <Text style={styles.heading}>Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={colors.textSecondary}
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.textSecondary}
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password (Optional)"
                    placeholderTextColor={colors.textSecondary}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    updateProfile();
                }}>
                    <Text>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
