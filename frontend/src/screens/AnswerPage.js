import React, { useEffect, useContext } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import questionsData from "../components/Questions.json";
import { AuthContext } from "../store/auth";
import { styles } from "../styles/Answer"
import { colors } from "../styles/colors";

export default AnswerPage = () => {
    const tokenContext = useContext(AuthContext);
    const [unanswered, setUnanswered] = useState([]);
    const [answered, setAnswered] = useState([]);

    useEffect(() => {

    }, []);
    
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.body}>
                {/* Answer questions */}
                <Text style={styles.title}>Your groups are waiting to hear back!</Text>
                <Text style={styles.heading}>Unanswered questions:</Text>
                <View style={styles.content}>
                    {[1, 4, 9].map((question) => (
                        <Text key={question} style={styles.note}>TODO: fetch unanswered from groups, map</Text>
                    ))}
                </View>
                
                {/* Edit open questions */}
                <Text style={styles.heading}>Want to revisit open questions?</Text>
                <View style={styles.content}>
                    {[1, 4, 9].map((question) => (
                        <Text key={question} style={styles.note}>TODO: fetch answered from groups, map</Text>
                    ))}
                </View>

                <Text style={[styles.note, {marginTop: 15, textAlign: 'center'}]}>Want to create a new question? A <Text style={{color: colors.highlight, fontWeight: "bold"}}>highlighted group</Text> is ready for a new question!</Text>
            </View>
        </ScrollView>
    );
};
