import { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../styles/Group';
import { getCurrentQuestion } from '../store/info';
import { colors } from '../styles/colors';
import { Exit } from './Svg';


export default function Group({group}) {
    const [open, setOpen] = useState(false);
    const [timer, setTimer] = useState(group.issueFrequency); // time until next question
    const timerRef = useRef(timer);
    const [question, setQuestion] = useState();

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
                            <TouchableOpacity style={[styles.button, timer === 0 ? {backgroundColor: colors.primary} : {}]}>
                                <Text style={{color: colors.textContrastPrimary}}>New Question</Text>
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
                            <Text style={styles.paragraph}>TODO: add answer/edit modal here as well: {question ? question.question : "No questions yet, start a conversation!"}</Text>

                            {/* previous questions */}
                            <Text style={[styles.heading, {alignSelf: "flex-start"}]}>Previous Questions</Text>
                            {
                                [...group.issues].reverse().slice(1).map((q) => (
                                    // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                                    <View key={q.id} style={styles.subcontent}>
                                        <Text style={styles.paragraph}>{q.question}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}
    