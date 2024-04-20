import { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../styles/Group';
import { getCurrentQuestion } from '../store/info';


export default function Group({group}) {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState();

    useEffect(() => {
        setQuestion(getCurrentQuestion(group));
    }, []);
    
    return (
        <View style={{width: "100%"}}>
            <TouchableOpacity style={styles.container} onPress={() => {setOpen(true)}}>
                <View style={styles.content}>
                        <Text style={styles.subheading}>{group.name}</Text>
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
                <View style={[styles.container, {paddingTop: 70}]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>Hello world!</Text>

                        <TouchableOpacity
                            style={{ ...styles.container, backgroundColor: "#2196F3" }}
                            onPress={() => setOpen(false)}
                        >
                            <Text style={styles.text}>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
    