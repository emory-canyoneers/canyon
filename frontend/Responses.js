import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import questionsData from "./Questions.json";
import Submitted from "./Submitted.js";

export default Answer = () => {
  const [data, setData] = React.useState(null);
  const [answers, setAnswers] = React.useState(["hey", "hi", "hola"]);

// {
//   "lindsay":["hi","hey","huh"],
//   "name":["hi","hey","huh"],
// }



  useEffect(() => {
    setData(questionsData);
    // const initialTextInputs = {};
    // questionsData.forEach((question) => {
    //   initialTextInputs[question.id] = "";
    // });
    // setTextInputs(initialTextInputs);
  }, []);

  return (
    <View>
      <Text style={styles.textStyle}>Responses</Text>
      <Text style={styles.sub}>Shoutout to Miles for selecting these Qs!</Text>
      {Array.isArray(data) &&
        data.slice(0, 3).map((item) => (
          <View key={item.id}>
            <Text style={styles.options}>{item.key}</Text>
            <Text style={styles.input}>{answers[item.id]}</Text>
          </View>
        ))}
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
    borderRadius: 4,
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
