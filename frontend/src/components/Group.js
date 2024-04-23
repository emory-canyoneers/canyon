import { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getCurrentQuestion } from '../store/info';
import { styles } from '../styles/Group';
import { colors } from '../styles/colors';
import Question from './Question';
import { Exit } from './Svg';

export default function Group({group}) {
    const [open, setOpen] = useState(false);
    const [timer, setTimer] = useState(group.issueFrequency); // time until next question
    const timerRef = useRef(timer);
    const [question, setQuestion] = useState();
    const [randomQuestion, setRandomQuestion] = useState();


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

    // updates timerRef with the current timer value
    useEffect(() => {
        timerRef.current = timer;
    }, [timer]); // runs whenever timer changes

    useEffect(() => {
        setQuestion(getCurrentQuestion(group));

        const interval = setInterval(() => {
            if (timerRef.current > 0) {
                setTimer(timer => timer - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    const handleNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const newQ = questions[randomIndex];
        setRandomQuestion(newQ);
        createIssue(newQ);
        console.log("RANDOM", newQ.key);
    }

    const createIssue = async (question) => {
        const url = `http://joincanyon.org/issues`;
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                question: question.key,
                groupId: group.id,
            })
        }
        try {
            const response = await fetch(url, options)
            if(!response.ok){
                throw new Error(`HTTP error! ${q.status}`);
            }
            const data = await response.json();
            console.log("NEW QUESTION", data);
            setQuestion(data);

        }catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <View style={{width: "100%"}}>
            <TouchableOpacity style={[styles.subcontainer, timer === 0 ? {backgroundColor: colors.primary} : {}]} onPress={() => {setOpen(true)}}>
                <View style={styles.paneContent}>
                        <Text style={[styles.subheading, {color: colors.secondary}]}>{group.name}</Text>
                        <Text 
                            style={styles.paragraph}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {question ? question.question : "No questions yet, start a conversation!"}
                        </Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                onRequestClose={() => setOpen(false)}
            >
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.modal}>
                    <View style={styles.body}>
                        <View style={styles.exit}>
                            <TouchableOpacity onPress={() => setOpen(false)}>
                                <Exit color={colors.textPrimary} scale={1.5}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.title, {color: colors.primary}]}>{group.name}</Text>

                        <View style={styles.content}>
                            {/* new question button, grayed if unavailable, highlighted if available */}
                            <Text style={styles.heading}>
                                New Question: {randomQuestion ? randomQuestion.key : ""}
                            </Text>
                            <TouchableOpacity
                                style={[
                                    styles.button, 
                                    timer === 0 ? { backgroundColor: colors.primary } : { backgroundColor: 'gray' }
                                ]}
                                onPress={handleNewQuestion}
                                disabled={timer !== 0}
                            >
                                <Text style={{ color: 'white' }}>New Question</Text>
                            </TouchableOpacity>

                            {/* timer to next available */}
                            <Text style={styles.note}>Next question available in {timer} seconds</Text>

                            {/* people */}
                            <Text style={[styles.heading, {alignSelf: "flex-start"}]}>People</Text>
                            {
                                group.members.map((member) => (
                                    <View key={member.id} style={styles.subcontent}>
                                        <Text style={styles.paragraph}>{member.name}</Text>
                                    </View>
                                ))
                            }

                            {/* current question */}
                            <Text style={[styles.heading, {alignSelf: "flex-start"}]}>Current Question</Text>
                                <Text style={styles.heading}>{question ? question.question : "No questions yet, start a conversation!"}</Text>
                            <Text style={styles.paragraph}>TODO: add answer/edit modal here as well: {question ? question.question : "No questions yet, start a conversation!"}</Text>

                            {/* previous questions */}
                            <Text style={[styles.heading, {alignSelf: "flex-start"}]}>Previous Questions</Text>
                            {
                                [...group.issues].reverse().slice(1).map((q) => (
                                    // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                                    <Question key={q.id} question={q} />
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}
    