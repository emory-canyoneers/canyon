import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { styles } from '../styles/ProfilePage';
import { colors } from '../styles/colors';
import { SelfContext } from '../store/self';
import { AuthContext } from '../store/auth';

export default ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const self = useContext(SelfContext)[0];
    const setToken = useContext(AuthContext)[1];

    const updateProfile = async () => {
        const url = "http://joincanyon.org/users/edit";
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

        const options = {
            method: "POST",
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
                    throw new Error(`HTTP error! status: ${response.status}\nResponse: ${response}`);
                }
                return response.json();
            })
            .then((data) => {
                return data;
            })
        
        setToken(response.token)
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
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password (Optional)"
                    placeholderTextColor={colors.textSecondary}
                    onChangeText={setPassword}
                    value={password}
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
