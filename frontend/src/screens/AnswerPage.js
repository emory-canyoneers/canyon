import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../store/auth";
import { InfoContext, getAllQuestions, getResponseId, getGroup, getCurrentQuestion } from "../store/info";
import { SelfContext } from "../store/self";
import { styles } from "../styles/Answer";
import { colors } from "../styles/colors";

export default AnswerPage = () => {
    const token = useContext(AuthContext)[0];
    const groups = useContext(InfoContext)[0];
    const setGroups = useContext(InfoContext)[1];
    const selfId = useContext(SelfContext)[0].id;
    const [unanswered, setUnanswered] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const [answer, setAnswer] = useState("");

    useEffect(() => {
        const questions = getAllQuestions(groups, selfId);
        setAnswered(questions.answered);
        setUnanswered(questions.unanswered);
    }, [groups]);

  const answerQuestion = (question) => {
    setCurrentQuestion(question);
    setAnswer("");
    setModalVisible(true);
  };

    const editQuestion = (question) => {
        setCurrentQuestion(question);
        setAnswer(question.answer);
        setModalVisible(true);
    };

    const getResponse = (question) => {
        if (question && question.responses) {
            return question.responses.find(response => response.user.id === selfId);
        }
        return null;
    }

    const submitAnswer = async () => {
        const url = `http://joincanyon.org/responses`;
        const data = {
            groupId: currentQuestion.group,
            response: answer
        };
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data)
        };

        try{
            const response = await fetch(url, options)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP error! ${response.status}`);
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    return data;
                });

            const group = getGroup(groups, response.group);
            getCurrentQuestion(group).responses.push(response);
            setGroups([...groups]);
        } catch (error) {
            console.error("Failed to submit answer: ", error);
        } finally {
            setModalVisible(false);
        }
    };

    const editAnswer = async () => {
        const url = `http://joincanyon.org/responses`;
        console.log(getResponseId(selfId, currentQuestion));
        const data = {
            responseId: getResponseId(selfId, currentQuestion),
            response: answer
        };
        const options = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data)
        };

        try{
            const response = await fetch(url, options)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP error! ${response.status}`);
                    } else {            
                        return response.json()
                    }
                })
                .then(data => {
                    return data;
                });
            
            console.log(getResponseId(selfId, currentQuestion))
            console.log(JSON.stringify(response, null, 2))


            const group = getGroup(groups, response.group);
            // get the response from group most recent issue and replace
            getCurrentQuestion(group).responses.find(response => response.user.id === selfId).response = response.response;
            setGroups([...groups]);
        } catch (error) {
            console.error("Failed to submit answer: ", error);
        } finally {
            setModalVisible(false);
        }
    };
    
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                <Pressable 
                    style = {styles.centeredView}
                    onPress = {() => setModalVisible(false)}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView} onStartShouldSetResponder={() => true}>
                        <Text style={styles.questionInModal}>{currentQuestion.question}</Text>
                        <TextInput
                            style={styles.answer_input}
                            onChangeText={setAnswer}
                            value={answer}
                            multiline={true}
                            placeholder="Your answer here..."
                            placeholderTextColor="white"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={getResponse(currentQuestion) ? editAnswer : submitAnswer}
                        >
                            <Text style={styles.textStyle}>
                                {getResponse(currentQuestion) ? "Edit" : "Submit"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
                </Pressable>
            </Modal>
            
            <View style={styles.body}>
                {/* Answer questions */}
                <Text style={styles.title}>Your groups are waiting to hear back!</Text>
                <Text style={styles.heading}>Unanswered questions:</Text>

        <View style={styles.content}>
          {unanswered.map((question) => (
            // TODO: add components, popup to answer question
            <Pressable
              key={question.id}
              style={[styles.noteContainer, styles.questionbutton]}
              onPress={() => answerQuestion(question)}
            >
              <Text
                key={question.id}
                style={[styles.note, { fontWeight: "bold", color: "black" }]}
              >
                {getGroup(groups, question.group).name}
              </Text>
              <Text style={[styles.note, { color: "black" }]}>
                {question.question}
              </Text>
            </Pressable>
          ))}
          {unanswered.length < 1 ? (
            <Text style={styles.note}>All open questions have been answered!🎉🥳</Text>
          ) : null}
        </View>

        {/* Edit open questions */}
        <Text style={styles.heading}>Click to edit open questions</Text>
        <View style={styles.content}>
          {answered.map((question) => (
            // TODO: reuse unanswered question component, change to edit button
            <Pressable
              key={question.id}
              onPress={() => editQuestion(question)}
              style={[styles.noteContainer, styles.questionbutton]}
            >
              <Text
                key={question.id}
                style={[styles.note, { fontWeight: "bold", color: "black" }]}
              >
                {getGroup(groups, question.group).name}
              </Text>
              <Text style={[styles.note, { color: "black" }]}>
                {question.question}
              </Text>
              <Text style={[styles.note, { color: "#3b3b3b" }]}>
                Your answer: {getResponse(question).response}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.note, { marginTop: 15 }]}>
          Want to create a new question? A{" "}
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            highlighted group
          </Text>{" "}
          is ready for a new question!
        </Text>
      </View>
    </ScrollView>
  );
};
