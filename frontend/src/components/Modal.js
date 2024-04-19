import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  CheckBox,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
  Share,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const Modal = ({ questions }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [issueCreated, setIssueCreated] = useState(false);

  const onShare = async () => {
    if (showDate) {
      var listOfQuestions = "";
      let count = 1;
      // Object.keys(questions).map(function (id) {
      //   listOfQuestions += "\n" + count + ". " + questions[id].key;
      //   count++;
      // });
      questions = questions[id].key;
    }
    try {
      const result = await Share.share({
        title: "QOTWs",
        url: "https://reactnative.dev/docs/share?language=javascript",
        message: `${questions}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const createNewIssue = async () => {
    const url = "http://joincanyon.org/issues";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMDMyNjIyLCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMwMzI2MjIsImV4cCI6MTcxMzAzNjIyMiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Wbi-7yfu994HN7Yl6_U6-xeutO0ivOG5YSZbF14FOX4ECCpGhWFu1Mhk7nMFujtsJ5IAANFsMYBiDRC0mlJ_bQ5P38_hmVvxf2iZmHl2wvwjoLVoieD0iHX-7vad4cjxzS46GSOVK4O30Njje4gt26JcnVs9GMZF0BGUpoabl-Bjii07NzGEKINrV77c1BL2PrTu5As9fb0ESy299VgSQ6Rt09tdQf25tdPuUJ9k4haBTfzqcjZWJuQAZ_XPM85pKAy25_8Kf0xVSTFdYQygDuy8xoy3z_MpY9mjTQhPUbxssuoMVucmJDH2n2gwcKhknFSQPJmpOiY1m7ENG_uY_Q",
      },
      body: JSON.stringify({
        groupId: "661ac1decbda68552adf9290",
        question: questions[0].key,
      }),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data.question" + data.question);
        console.log("data.id" + data.id);
        setIssueCreated(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShowDate(true);
  };

  const showTimepicker = () => {
    showMode("time");
    setShowDate(true);
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return month + "/" + date + "/" + year;
  };

  return (
    <SafeAreaView>
      {!issueCreated ? (
        <Pressable
          style={[
            styles.sched1,
            questions.length > 0
              ? { backgroundColor: "#3CB776" }
              : { backgroundColor: "#e8e8e8" },
          ]}
          onPress={createNewIssue}
        >
          <Text style={{ textAlign: "center" }}>Create New Issue</Text>
        </Pressable>
      ) : (
        <View>
          <Text style={styles.text}>
            Awesome. Issue created successfully! Send a reminder?
          </Text>
          <Pressable
            style={[
              styles.sched,
              showDate
                ? { backgroundColor: "#B6D0E2" }
                : { backgroundColor: "#e8e8e8" },
            ]}
            onPress={onShare}
          >
            <Text style={{ textAlign: "center" }}>Send Text Now</Text>
          </Pressable>
        </View>
      )}
      {/* {issueCreated && (
        <>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={showDatepicker}
              style={[styles.date, { marginLeft: 10 }]}
            >
              <Text style={{ textAlign: "center" }}>Select Date</Text>
            </Pressable>
            <Pressable onPress={showTimepicker} style={styles.date}>
              <Text style={{ textAlign: "center" }}>Select Time</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {showDate && (
              <Text style={styles.selectedDate}>
                {date.toLocaleString("en-US")}
              </Text>
            )}
            {show && (
              <DateTimePicker
                style={styles.picker}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <Pressable
            style={[
              styles.sched,
              showDate
                ? { backgroundColor: "#B6D0E2" }
                : { backgroundColor: "#e8e8e8" },
            ]}
          >
            <Text style={{ textAlign: "center" }}>Schedule Notification </Text>
          </Pressable>
        </>
      )} */}
    </SafeAreaView>
  );
};

const styles = {
  text:{
    margin: 15,
    fontSize: 16,
    color: "white",
  },
  date: {
    backgroundColor: "#B6D0E2",
    padding: 10,
    color: "white",
    borderRadius: 8,
    marginLeft: 10,
    marginTop: 10,
  },
  selectedDate: {
    marginLeft: 15,
    fontSize: 16,
    color: "white",
  },
  sched: {
    width: 370,
    padding: 10,
    color: "black",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  sched1: {
    width: 370,
    padding: 10,
    color: "black",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  schedule: {
    marginTop: 10,
  },
};
