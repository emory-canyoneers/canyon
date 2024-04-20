import React, { useState, useEffect } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { Modal } from "../src/components/Modal";

const questionsData = require("../src/components/Questions.json");

export default Select = () => {
  const [data, setData] = React.useState(questionsData);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);

  useEffect(() => {
    getDataFromBackend();
    setData(questionsData);
  }, []);

  async function getDataFromBackend() {
    const url = "http://joincanyon.org/groups";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMDMyNjIyLCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMwMzI2MjIsImV4cCI6MTcxMzAzNjIyMiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Wbi-7yfu994HN7Yl6_U6-xeutO0ivOG5YSZbF14FOX4ECCpGhWFu1Mhk7nMFujtsJ5IAANFsMYBiDRC0mlJ_bQ5P38_hmVvxf2iZmHl2wvwjoLVoieD0iHX-7vad4cjxzS46GSOVK4O30Njje4gt26JcnVs9GMZF0BGUpoabl-Bjii07NzGEKINrV77c1BL2PrTu5As9fb0ESy299VgSQ6Rt09tdQf25tdPuUJ9k4haBTfzqcjZWJuQAZ_XPM85pKAy25_8Kf0xVSTFdYQygDuy8xoy3z_MpY9mjTQhPUbxssuoMVucmJDH2n2gwcKhknFSQPJmpOiY1m7ENG_uY_Q",
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("asdfads" + data[0].name);
        console.log("hello");
      })
      .catch((e) => {
        console.error(e);
      });
    console.log("yep");
  }

  const onchecked = (id) => {
    // Update data with new checked states
    const newData = data.map((item) => {
      if (item.id === id) {
        // Toggle the checked state of the selected item
        const updatedItem = { ...item, checked: !item.checked };
        return updatedItem;
      } else {
        // Ensure all other items are not checked
        return { ...item, checked: false };
      }
    });
  
    // Set the new data state
    setData(newData);
  
    // Find the newly checked item, if any
    const checkedItem = newData.find((item) => item.id === id && item.checked);
  
    if (checkedItem) {
      // If an item is checked, set it as the only selected question
      setSelectedQuestions([checkedItem]);
    } else {
      // If no item is checked, clear the selected questions
      setSelectedQuestions([]);
    }
  };
  

  renderQuestions = () => {
    return data.map((item, key) => {
      // getDataFromBackend();
      return (
        <TouchableOpacity
          key={key}
          style={!item.checked ? styles.box : styles.boxChecked}
          onPress={() => {
            onchecked(item.id);
          }}
        >
          {/* <Image
            style={styles.tinyImg}
            source={
              !item.checked
                ? require("./assets/uncheckedImg.png")
                : require("./assets/checkedImg.png")
            }
            value={item.checked}
            onValueChange={() => {
              this.onchecked(item.id);
            }}
          /> */}
          <Text style={styles.options}>{item.key}</Text>
        </TouchableOpacity>
      );
    });
  };

  getSelectedQuestions = () => {
    // Filter out the selected questions based on their checked status
    const selected = data.filter((item) => item.checked);
    setSelectedQuestions(selected); // Assuming you want to update the state as well
    console.log("hey" + selected);
    return selected;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.textStyle, { paddingTop: 70 }]}>
        Julia, it's your turn! 🎉 🙌
      </Text>
      <Text style={styles.subTextStyle}> Pick a question for this week!</Text>
      {this.renderQuestions()}
      <Modal questions={selectedQuestions} />
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: "#121418",
    flex: 1,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2029",
    margin: 10,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  boxChecked: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8296E1",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    paddingLeft: 10,
  },
  textStyle: {
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    color: "#FFFFFF",
  },
  subTextStyle: {
    paddingBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    color: "#FFFFFF",
  },
  tinyImg: {
    width: 18,
    height: 18,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  options: {
    marginRight: 20,
    fontSize: 16,
    color: "#FFFFFF",
  },
};
