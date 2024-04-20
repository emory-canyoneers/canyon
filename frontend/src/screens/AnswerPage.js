import { useContext, useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AuthContext } from "../store/auth";
import { InfoContext, getAllQuestions } from "../store/info";
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

    const submitAnswer = async () => {
        const url = `http://joincanyon.org/responses/${currentQuestion.id}/`;
        const data = {
            response: answer,
            groupId: currentQuestion.groupId
        };
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            console.log(response.status, await response.text());
            if (!response.ok) {
                console.error("Failed to submit answer: !!!");
            } else {
                console.log("Successfully submitted answer!");
                const questions = getAllQuestions(groups, selfId);
                setAnswered(questions.answered);
                setUnanswered(questions.unanswered);
                console.log("Submitting answer: ");
            }
        } catch (error) {
            console.error("Failed to submit answer: ");
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                            onPress={submitAnswer}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
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
                        <Pressable key={question.id} onPress={() => answerQuestion(question)} style={styles.noteContainer}>
                            <Text style={styles.note}>{question.question}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={[styles.note, {marginTop: 15, textAlign: 'center'}]}>Want to create a new question? A <Text style={{color: colors.primary, fontWeight: "bold"}}>highlighted group</Text> is ready for a new question!</Text>
            </View>
        </ScrollView>
    );
};
