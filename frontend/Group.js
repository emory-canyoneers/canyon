import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';


export default function Group({group}) {
    return (
        <View style={styles.groupContainer}>
            <Text style={styles.groupName}>{group.name}</Text>
            {group.users.map((user, index) => (
                <Text key={index} style={styles.userName}>{user.name}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    groupContainer: {
        backgroundColor: "#1E2029",
        borderRadius: 5,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',  
    },
    groupName: {
        color: "#FFFFFF",
        marginBottom: 10,  
        fontWeight: 'bold',
        fontSize: 18,
    },
    userContainer: {
        flexDirection: 'row',  
    },
    userName: {
        color: "#CCCCCC",
        marginRight: 20,  
        fontSize: 16,
    },
});
  