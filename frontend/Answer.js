import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Modal } from "./Modal";
import questionsData from "./Questions.json";
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
    <View>
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
  textStyle: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 19,
  },
  sub: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  options: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
  },
  input: {
    height: 35,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#E5E4E2",
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
  },
};
