import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity, // Import TouchableOpacity for the button
  View
} from "react-native";
import { groupStyles, styles } from "../styles/Group";

export default function SelectQuestion() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(questions);
    const [clicked, setClicked] = useState(false);
    const [question, setQuestion] = useState();

    // Function to toggle the modal open state
    const toggleModal = () => setOpen(!open);

    useEffect(() => {
      setData(questions);
    }, []);

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

    const questions = [
      { id: 0, key: "What is your earliest memory?" },
      { id: 1, key: "What area in your life are you looking to improve?" },
      {
        id: 2,
        key: "What is something that is important to you that you never really talk about?",
      },
      { id: 3, key: "What motivates you?" },
      { id: 4, key: "What's the best advice you've ever received?" },
      {
        id: 5,
        key: "What's a deep or difficult question you've been pondering lately?",
      },
      {
        id: 6,
        key: "How would you describe your approach to your career so far?",
      },
      {
        id: 7,
        key: "What's something you're absolutely convinced is going to happen in the future?",
      },
      { id: 8, key: "What's something you recently learned?" },
    ];

    return (
        <View style={{ width: "100%" }}>
            {/* Button to open the modal */}
            <TouchableOpacity
                style={styles.button}
                onPress={toggleModal} // Attach toggleModal to the onPress event
            >
                <Text style={styles.buttonText}>Open Questions</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                onRequestClose={toggleModal} // Use toggleModal to handle request close
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.modal}
                >
                    <Text>Open!</Text>
                    {/* Button to close the modal */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleModal} // Attach toggleModal to the onPress event
                    >
                      {!clicked ? (
                      <View>
                        <Text>
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
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </View>
    );
}