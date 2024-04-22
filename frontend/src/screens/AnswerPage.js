import { useContext, useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AuthContext } from "../store/auth";
import { InfoContext, getAllQuestions, getResponseId } from "../store/info";
import { SelfContext } from "../store/self";
import { styles } from "../styles/Answer";
import { colors } from "../styles/colors";

export default AnswerPage = () => {
    const token = useContext(AuthContext)[0];
    const groups = useContext(InfoContext)[0];
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
    }, []);

    const answerQuestion = (question) => {
        setCurrentQuestion(question);
        setAnswer("");
        setModalVisible(true);
    };

    const editQuestion = (question) => {
        setCurrentQuestion(question);
        setAnswer(question.answer || "");
        setModalVisible(true);
    };

    const submitAnswer = async () => {
        const url = `http://joincanyon.org/responses`;
        const data = {
            response: answer,
            groupId: currentQuestion.groupId
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

        console.log(data)

        try{
            const response = await fetch(url, options)
            
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                } else {
                    currentQuestion.isAnswered = true;
                    console.log("Successfully submitted/ edited answer!");
                
                return response.json()
                }
            })
            .then(data => {
                return data;
            });
        } catch (error) {
            console.error("Failed to submit answer: ", error);
        } finally {
            setModalVisible(false);
        }
    };

    const editAnswer = async () => {
        if (!currentQuestion.id) {
            console.error("No response ID found for question: ", currentQuestion);
            return;
        }
        const url = `http://joincanyon.org/responses`;
        const data = {
            responseId: getResponseId(answered, selfId, currentQuestion.id),
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
        console.log(currentQuestion.id)
        console.log(data)

        try{
            const response = await fetch(url, options)
            
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                } else {
                    currentQuestion.isAnswered = true;
                    console.log("Successfully submitted/ edited answer!");
                
                return response.json()
                }
            })
            .then(data => {
                return data;
            });
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
                        <Text style={styles.modalText}>{currentQuestion.question}</Text>
                        <TextInput
                            style={styles.answer_input}
                            onChangeText={setAnswer}
                            value={answer}
                            multiline={true}
                            placeholder="Your answer here..."
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={currentQuestion.isAnswered ? submitAnswer : editAnswer}
                        >
                            <Text style={styles.textStyle}>
                                {currentQuestion.isAnswered ? "Submit" : "Edit"}
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
                        <Pressable key={question.id} style={styles.noteContainer} onPress={() => answerQuestion(question)}>
                            <Text style={styles.note}>{question.question}</Text>
                        </Pressable>
                    ))}
                </View>
                
                {/* Edit open questions */}
                <Text style={styles.heading}>Want to revisit open questions?</Text>
                <View style={styles.content}>
                    {answered.map((question) => (
                        // TODO: reuse unanswered question component, change to edit button
                        <Pressable key={question.id} onPress={() => editQuestion(question)} style={styles.noteContainer}>
                            <Text style={styles.note}>{question.question}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={[styles.note, {marginTop: 15, textAlign: 'center'}]}>Want to create a new question? A <Text style={{color: colors.primary, fontWeight: "bold"}}>highlighted group</Text> is ready for a new question!</Text>
            </View>
        </ScrollView>
    );
};
