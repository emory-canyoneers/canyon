import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/Group';

export default function Question({question}) {
    const [open, setOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const openDetails = (question) => {
        console.log("Opening details for question", question);
        setSelectedQuestion(question);
        setOpen(true); //opens the second modal 
    }

    return (
        <View>
            <TouchableOpacity onPress={openDetails}>
                <Text style={styles.note}>{question.question}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={() => setOpen(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{color:'white', fontWeight:'bold'}}>WORKING</Text>
                        <Text style={styles.modalText}>{selectedQuestion?.question}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}