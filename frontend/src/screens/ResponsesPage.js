import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { InfoContext } from "../store/info";
import { styles } from "../styles/Home";
import { colors } from "../styles/colors";

export default function ResponsesPage() {
    const groupsContext = useContext(InfoContext);
    const groups = groupsContext[0];

    return (
        <ScrollView style={[styles.scrollView, groupStyles.parentContainer]}>
            <View style={styles.body}>
                <Text style={styles.heading}>Check out previous group responses 🙌</Text>

                <View style={styles.content}>
                    {groups.map((group) => (
                        // <Response key={group.id} group={group} />
                        <View key={group.id}>
                            <Text style={[styles.heading, { color:colors.secondary }]}>
                                {group.name}
                            </Text>
                            <Text style={styles.paragraph}>
                                {group.members.map((member) => member.name).join(", ")}
                            </Text>
                            {/* <Text style={[styles.heading, { alignSelf: "flex-start" }]}>
                                Previous Questions
                            </Text> */}
                            {[...group.issues]
                                .reverse()
                                .slice(1)
                                .map((q) => (
                                    // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                                    <View key={q.id}>
                                        <Text style={groupStyles.option}>{q.question}</Text>
                                        {/* <Text style={groupStyles.option}>{q.date}</Text> */}
                                        {q.responses.map((r) => (
                                            <View key={r.id} style={groupStyles.responseContainer}>
                                                {/* <Image
                                                    style={styles.image}
                                                    source={require("./old/ex.png")}
                                                /> */}
                                                <View>
                                                    <Text style={groupStyles.name}>{r.user.name}</Text>
                                                    <Text style={groupStyles.text}>{r.response}</Text>
                                                </View>
                                            </View>
                                        ))}
                                        {q.responses.length < 1 ? (
                                            <Text style={groupStyles.name}>No one answered 😔</Text>
                                        ) : null}
                                        {/* <View style={styles.container}>
                                        <Image style={styles.image} source={require("./ex.png")} />
                                        <View style={styles.textContainer}>
                                                <Text style={styles.name}>{person}</Text>
                                                <Text style={styles.text}>{text}</Text>
                                        </View>
                                        </View> */}
                                    </View>
                                ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const groupStyles = {
    responseContainer: {
        flexDirection: "column", // Align children in a row
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 4,
        backgroundColor: "#1E2029",
        padding: 15,
        width: "105%",
        alignItems: "flex-start", // Align items in the center vertically
    },
    parentContainer: {
        paddingTop: 70,
        paddingLeft: 20,
    },
    name: {
        color: "#6C6E77",
        marginBottom: 5,
    },
    text: {
        color: "#FFFFFF",
        paddingRight: 40,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20, // This makes it a circle
    },
    option: {
        marginBottom: 12,
        marginTop: 12,
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
};
