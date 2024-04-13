import React from "react";
import { Text, View, Image } from "react-native";

export default function Response({ text, person, photo }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./ex.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{person}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row", // Align children in a row
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
