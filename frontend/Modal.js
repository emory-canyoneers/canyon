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
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMDI4NzQ2LCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMwMjg3NDYsImV4cCI6MTcxMzAzMjM0NiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.O6MsDbPxzOhNsc0bjurJEysb_7I-8_qDXYqkTFImCF3a_KfXr-r9aT_2xQPgMk1zupaV_bOK0MfEMvVcWKVPuKxz_cBRGVC6jYa9JTpXFiSjEMWsOGkqNhBxOCH6jR0VMe88lmwvakVltt5m8UPu4i8aXKmeSif8E7Qo6XZ1YkXvcAbUEkuhdWZaVgRWntGYiBqlrZqU0ooAmS506qPYInwse3dWeqC99lDYxIIrDIfcu5UYd55SNEhFf6-VH7h1G3tFkW7yWZpw2ZV2GpfUoKCA9gxZxyZHezJaolJyNoFe_oE8tF15VULT7kD6nR21muRDdYXbx6-Tu6LnLdtWyA",
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
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
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
          styles.sched1,
          showDate
            ? { backgroundColor: "#B6D0E2" }
            : { backgroundColor: "#e8e8e8" },
        ]}
        onPress={createNewIssue}
      >
        <Text style={{ textAlign: "center" }}>Create New Issue</Text>
      </Pressable>
      <Pressable
        style={[
          styles.sched,
          showDate
            ? { backgroundColor: "#B6D0E2" }
            : { backgroundColor: "#e8e8e8" },
        ]}
        onPress={onShare}
      >
        <Text style={{ textAlign: "center" }}>Send Text Reminder </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = {
  date: {
    backgroundColor: "#3CB776",
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
