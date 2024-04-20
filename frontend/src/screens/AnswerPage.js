import { useState, useEffect, useContext } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import { styles } from "../styles/Answer"
import { colors } from "../styles/colors";
import { AuthContext } from "../store/auth";
import { InfoContext } from "../store/info";
import { SelfContext } from "../store/self";
import { getAllQuestions } from "../store/info"

export default AnswerPage = () => {
    const token = useContext(AuthContext)[0];
    const groups = useContext(InfoContext)[0];
    const selfId = useContext(SelfContext)[0].id;
    const [unanswered, setUnanswered] = useState([]);
    const [answered, setAnswered] = useState([]);

    useEffect(() => {
        const questions = getAllQuestions(groups, selfId);
        setAnswered(questions.answered);
        setUnanswered(questions.unanswered);
    }, []);
    
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.body}>
                {/* Answer questions */}
                <Text style={styles.title}>Your groups are waiting to hear back!</Text>
                <Text style={styles.heading}>Unanswered questions:</Text>
                <View style={styles.content}>
                    {unanswered.map((question) => (
                        // TODO: add components, popup to answer question
                        <Text key={question.id} style={styles.note}>{question.question}</Text>
                    ))}
                </View>
                
                {/* Edit open questions */}
                <Text style={styles.heading}>Want to revisit open questions?</Text>
                <View style={styles.content}>
                    {answered.map((question) => (
                        // TODO: reuse unanswered question component, change to edit button
                        <Text key={question.id} style={styles.note}>{question.question}</Text>
                    ))}
                </View>

                <Text style={[styles.note, {marginTop: 15, textAlign: 'center'}]}>Want to create a new question? A <Text style={{color: colors.primary, fontWeight: "bold"}}>highlighted group</Text> is ready for a new question!</Text>
            </View>
        </ScrollView>
    );
};
