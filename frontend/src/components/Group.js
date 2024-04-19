import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';


export default function Group({group}) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{group.name}</Text>
            {group.members.map((member) => (
                <Text key={member.id} style={styles.text}>{member.id}</Text>
            ))}
        </View>
    );
}

const styles = {
    container: {
      flexDirection: "column", // Align children in a 
      margin: 12,
      borderRadius: 4,
      backgroundColor: "#1E2029",
      padding: 15,
      alignItems: "center", // Align items in the center vertically
    },
    textContainer: {
      marginLeft: 10, // Add some space between the image and text
    },
    name: {
      color: "#6C6E77",
      marginBottom: 5,
    },
    text: {
      color: "#FFFFFF",
      paddingRight: 40,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20, // This makes it a circle
    },
  };
  