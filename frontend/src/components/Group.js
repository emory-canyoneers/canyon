import { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Alert,
  Share,
} from "react-native";
import { getCurrentQuestion } from "../store/info";
import { styles } from "../styles/Group";
import { colors } from "../styles/colors";
import Question from "./Question";
import { Exit } from "./Svg";
import { OurModal } from "./Modal";
import { AuthContext } from "../store/auth";


export default function Group({ group }) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(group.issueFrequency); // time until next question
  const timerRef = useRef(timer);
  const [question, setQuestion] = useState();
  const [randomQuestion, setRandomQuestion] = useState();
  const [clicked, setClicked] = useState(false);
  const [profileName, setProfileName] = useState("");
  const questions = [
    { id: 0, key: "What is your earliest memory?" },
    { id: 1, key: "What area in your life are you looking to improve?" },
    { id: 2, key: "What is something that is important to you that you never really talk about?" },
    { id: 3, key: "What motivates you?" },
    { id: 4, key: "What's the best advice you've ever received?" },
    { id: 5, key: "What's a deep or difficult question you've been pondering lately?" },
    { id: 6, key: "How would you describe your approach to your career so far?" },
    { id: 7, key: "What's something you're absolutely convinced is going to happen in the future?" },
    { id: 8, key: "What's something you recently learned?" },
  ];

  const [data, setData] = useState(questions);
  const token = useContext(AuthContext)[0];
  const [selectedQuestion, setSelectedQuestion] = useState();


  // updates timerRef with the current timer value
  // useEffect(() => {
  //   timerRef.current = timer;
  // }, [timer]); // runs whenever timer changes

  useEffect(() => {
    // setQuestion(getCurrentQuestion(group));
    setData(questions);

    // const interval = setInterval(() => {
    //   if (timerRef.current > 0) {
    //     setTimer((timer) => timer - 1);
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 1000);

    // return () => clearInterval(interval);
  }, []);

  const handleNewQuestion = () => {
    //const randomIndex = Math.floor(Math.random() * questions.length);
    const newQ = questions[selectedQuestion];
    setRandomQuestion(newQ);
    createIssue(newQ);
    setQuestion(newQ);
    setClicked(true);
    // console.log("RANDOM", newQ.key);
  };

  const createIssue = async (question) => {
    const url = `http://joincanyon.org/issues`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        groupId: group.id,
        question: question.key,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! ${q.status}`);
      }
      const data = await response.json();
      // console.log("NEW QUESTION", data);
      setQuestion(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onchecked = (id) => {
    // Update data with new checked states
    setSelectedQuestion(id);
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
      setQuestion(checkedItem);
    } else {
      // If no item is checked, clear the selected questions
      setQuestion();
    }
  };

  renderQuestions = () => {
    return !clicked ? (
      data.map((item, key) => {
        // getDataFromBackend();
        return (
          <TouchableOpacity
            key={key}
            style={!item.checked ? groupStyles.box : groupStyles.boxChecked}
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
            <Text style={groupStyles.options}>{item.key}</Text>
          </TouchableOpacity>
        );
      })
    ) : (
      <Text style={groupStyles.textStyle}>
        Thanks for selecting a question!
      </Text>
    );
  };

  getSelectedQuestions = () => {
    // Filter out the selected questions based on their checked status
    const selected = data.filter((item) => item.checked);
    setQuestion(selected); // Assuming you want to update the state as well
    console.log("hey" + selected);
    return selected;
  };

  const fetchSelf = async () => {
    const url = `http://joincanyon.org/users`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });

    setSelf(response);
  };

  const onShare = async () => {
    var listOfQuestions = "";
    let count = 1;
    qs = question ? question.key : "";
    try {
      const result = await Share.share({
        title: "QOTWs",
        // url: "https://reactnative.dev/docs/share?language=javascript",
        message: `Answer my question in Canyon. ;) \n\n${qs}`,
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

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={[
          styles.subcontainer,
          timer === 0 ? { backgroundColor: colors.primary } : {},
        ]}
        onPress={() => {
          setOpen(true);
        }}
      >
        <View style={styles.paneContent}>
          <Text style={[styles.subheading, { color: colors.secondary }]}>
            {group.name}
          </Text>
          <Text style={styles.paragraph} numberOfLines={1} ellipsizeMode="tail">
            {group.issues[0]
              ? group.issues[group.issues.length-1].question
              : "No questions yet, start a conversation!"}
          </Text>
        </View>
      </TouchableOpacity>
      {/* {console.log(members)} */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.body}>
            <View style={styles.exit}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Exit color={colors.textPrimary} scale={1.5} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: colors.primary }]}>
              {group.name}
            </Text>

            <View style={styles.content}>
              {/* people */}
              <Text
                style={[groupStyles.textStyle, { alignSelf: "flex-start" }]}
              >
                People
              </Text>
              <View style={styles.subcontent}>
                <Text style={styles.paragraph}>
                  {group.members.map((member) => member.name).join(", ")}
                </Text>
              </View>

              {/* new question button, grayed if unavailable, highlighted if available */}
              {/* <Text style={styles.heading}>
                New Question: {randomQuestion ? randomQuestion.key : ""}
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  timer === 0
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: "gray" },
                ]}
                onPress={handleNewQuestion}
                disabled={timer !== 0}
              >
                <Text style={{ color: "white" }}>Generate new question</Text>
              </TouchableOpacity> */}

              {/* timer to next available */}
              {/* <Text style={styles.note}>
                Next question available in {timer} seconds
              </Text> */}
              {!clicked ? (
                <View>
                  <Text style={groupStyles.textStyle}>
                    Pick a question for this week! 🎉 🙌
                  </Text>
                  {/* <Text style={groupStyles.subTextStyle}>
                    Pick a question for this week!
                  </Text> */}
                </View>
              ) : null}
              {this.renderQuestions()}
              {question && clicked ? (
                <Text style={styles.paragraph}>{question.key}</Text>
              ) : null}
              <View style={groupStyles.row}>
                {!clicked ? (
                  <Pressable
                    style={[
                      groupStyles.sched,
                      question
                        ? { backgroundColor: "#71bc68" }
                        : { backgroundColor: "#e8e8e8" },
                    ]}
                    onPress={handleNewQuestion}
                  >
                    <Text style={{ textAlign: "center" }}>Select Question</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={[
                      groupStyles.sched,
                      question
                        ? { backgroundColor: "#71bc68" }
                        : { backgroundColor: "#e8e8e8" },
                    ]}
                    onPress={onShare}
                  >
                    <Text style={{ textAlign: "center" }}>Send Text Now</Text>
                  </Pressable>
                )}
              </View>
              {/* <OurModal
                questions={
                  question
                    ? question.key
                    : ""
                }
              /> */}
              {/* current question */}
              {/* <Text style={[styles.heading, { alignSelf: "flex-start" }]}>
                Current Question
              </Text> */}
              {/* <Text style={styles.paragraph}>
                TODO: add answer/edit modal here as well:{" "}
                {question
                  ? question.question
                  : "No questions yet, start a conversation!"}
              </Text> */}

              {/* previous questions */}
              <Text style={[styles.heading, { alignSelf: "flex-start" }]}>
                Previous Questions
              </Text>
              {[...group.issues]
                .reverse()
                .slice(1)
                .map((q) => (
                  // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                  <Question key={q.id} question={q} />
                ))}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const groupStyles = {
  container: {
    backgroundColor: "#121418",
    flex: 1,
  },
  row: {
    flexDirection: "column",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2029",
    // margin: 10,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 4,
    width: "100%",
  },
  boxChecked: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8296E1",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    paddingLeft: 10,
    width: "100%",
  },
  textStyle: {
    fontWeight: "bold",
    paddingTop: 20,
    fontSize: 18,
    color: "#FFFFFF",
  },
  subTextStyle: {
    paddingBottom: 10,
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
  text: {
    margin: 15,
    fontSize: 16,
    color: "white",
  },
  sched: {
    width: "48%",
    padding: 10,
    color: "black",
    borderRadius: 8,
    marginRight: 10,
  },
};
