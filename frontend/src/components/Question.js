import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/Group";

export default function Question({ question }) {
  const [open, setOpen] = useState(false);

  const openDetails = () => {
    setOpen(true); //opens the second modal
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={[styles.questionContainer]}
        onPress={openDetails}
      >
        <Text style={styles.note}>{question.question}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={[styles.centeredView]} onPress={() => setOpen(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {question.question}
              </Text>
              {question.responses.map((response) => (
                <View key={response.id}>
                  <Text style={{ color: "white" }}>
                    {response.user.name}: {response.response}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
