import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Modal } from "../src/components/Modal.js";
import questionsData from "../src/components/Questions.json";
import { Link } from "@react-navigation/native";
import Submitted from "./Submitted.js";

export default Answer = () => {
  const [data, setData] = React.useState(null);
  const [textInputs, setTextInputs] = React.useState({});
  const [submitClicked, setSubmitClicked] = React.useState(false);

  useEffect(() => {
    setData(questionsData);
    const initialTextInputs = {};
    questionsData.forEach((question) => {
      initialTextInputs[question.id] = "";
    });
    setTextInputs(initialTextInputs);
  }, []);

  const onChangeText = (id, newText) => {
    setTextInputs((prevTextInputs) => ({
      ...prevTextInputs,
      [id]: newText,
    }));
  };

  const handleSubmitClicked = () => {
    setSubmitClicked(true);
  };

  return (
    <View style={styles.container}>
      {submitClicked ? (
        <Submitted
          data={data}
          textInputs={textInputs}
          onChangeText={onChangeText}
        />
      ) : (
        <View>
          <Text style={styles.textStyle}>Answer this week’s questions.</Text>
          <Text style={styles.sub}>Thanks, Julia for picking these!</Text>
          {Array.isArray(data) &&
            data.slice(0, 3).map((item) => (
              <View key={item.id}>
                <Text style={styles.options}>{item.key}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(newText) => onChangeText(item.id, newText)}
                  value={textInputs[item.id]}
                  placeholder="Enter answer here"
                  placeholderTextColor="#6C6E77" 
                />
              </View>
            ))}
          <Pressable style={styles.sched} onPress={handleSubmitClicked}>
            <Text style={{ textAlign: "center" }}>Submit</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "#121418",
    flex: 1,
  },
  textStyle: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 19,
    color: "#FFFFFF",
  },
  sub: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#6C6E77",
  },
  options: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: "#FFFFFF",
  },
  input: {
    height: 35,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#1E2029",
    color: "#FFFFFF",
  },
  sched: {
    padding: 10,
    color: "black",
    borderRadius: 8,
    marginLeft: "auto",
    marginTop: 20,
    marginRight: 10,
    width: 120,
    backgroundColor: "#C9DBC9",
  },
  thankYou: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    color: "white",
  },
};
