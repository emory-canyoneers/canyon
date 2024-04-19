import React, { useEffect, useContext } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import questionsData from "../components/Questions.json";
import AuthContext from "../store/AuthContext";

export default Answer = () => {
  const [textInput, setTextInput] = React.useState("");
  const [submitClicked, setSubmitClicked] = React.useState(false);
  const [editClicked, setEditClicked] = React.useState(false);
  const [groupId, setGroupId] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const tokenContext = useContext(AuthContext);

  const onChangeText = (newText) => {
    setTextInput((prevTextInput) => ({
      ...prevTextInput,
      newText,
    }));
  };

  const handleSubmitClicked = () => {
    setSubmitClicked(true);
  };

  const handleEditClicked = () => {
    setEditClicked(true);
  };


  const getGroupId = async (token) => {
    console.log("Running get group id with token: " + token)
    const url = "http://joincanyon.org/groups"
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token
        }
      };

      const response = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        return response.json()
      })
      .then((data) => {
        return data[0].id
      })

      return response;
  };

  // const groupId = getGroupId(tokenContext[0]);

  const getQuestion = async (param, token) => {
    const url = "http://joincanyon.org/issues/" + param;//+"?limit=1";
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer "+token,
        }
      }
    return await fetch(url, options)
      .then((response) => {
        //console.log(url);
        //console.log(param);
        if (!response.ok) {
          throw new Error("HTTP error status: " + response.status)
        }
        return response.json()
      })
      .then((data) => {
        return data[0].question;
      })
  };

  useEffect(() => {
    const initialTextInput = {};
    questionsData.forEach((question) => {
      initialTextInput[question.id] = "";
    });
    setTextInput(initialTextInput);
  }, []);
  
  return (
    <View style={styles.container}>
      {submitClicked ? (
        <View>
        <Text style={styles.textStyle}>Thank you for submitting this week's answer!</Text>
        <Pressable style={styles.sched} onPress={async () => {
          const id = await getGroupId(tokenContext[0]);
          setGroupId(groupId);
          const ques = await getQuestion(id, tokenContext[0])
          setQuestion(ques);
        }}>
          <Text style={{ textAlign: "center" }}>Get Questions</Text>
        </Pressable>
        <Text style={styles.options}>{question}</Text>
        <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangeText(newText)}
                value={textInput}
                placeholder="Enter answer here"
                placeholderTextColor="#6C6E77" 
              />
        <Pressable style={styles.sched} onPress={handleEditClicked}>
          <Text style={{ textAlign: "center" }}>Edit</Text>
        </Pressable>
      </View>
      ) : (
        <View>
          <Text style={styles.textStyle}>Answer this week’s questions.</Text>
          <Pressable style={styles.sched} onPress={async () => {
            const id = await getGroupId(tokenContext[0]);
            setGroupId(groupId);
            const ques = await getQuestion(id, tokenContext[0])
            setQuestion(ques);
          }}>
            <Text style={{ textAlign: "center" }}>Get Questions</Text>
          </Pressable>
          <Text style={styles.options}>{question}</Text>
          <TextInput
                  style={styles.input}
                  onChangeText={(newText) => onChangeText(newText)}
                  value={textInput}
                  placeholder="Enter answer here"
                  placeholderTextColor="#6C6E77" 
                />
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
