import React from "react";
import { Text, View } from "react-native";

export default function Issue({ issue }) {
    return (
        <View style={styles.issueBox}>
            <Text style={styles.issueTitle}>{issue.question}</Text>
            {
                issue.responses.map((response) => (
                    <Text style={styles.sub} key={response.id}>{response.response}</Text>
                ))
            }
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: "#121418",
        flex: 1,
    },
    issueBox: {
        backgroundColor: "#1E1E1E",
        padding: 10,
        borderRadius: 8,
        margin: 10,
    },
    issueTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
    textStyle: {
        fontWeight: "bold",
        paddingTop: 70,
        paddingBottom: 10,
        // paddingLeft: 10,
        fontSize: 30,
        color: "white",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#C9DBC9",
        padding: 10,
        borderRadius: 8,
        alignSelf: "center",
        marginTop: 20,
        marginRight: 10,
        width: 120,
    },
    sub: {
        padding: 10,
        fontSize: 18,
        color: "#6C6E77",
        // fontSize: 23,
        // color: "#6C6E77",
        // textAlign: "center",
        // width: "84%",
        // marginLeft: "auto",
        // marginRight: "auto",
    }
};
