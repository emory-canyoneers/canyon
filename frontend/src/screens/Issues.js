import React, { useContext } from "react";
import AuthContext from '../store/AuthContext';
import { Text, ScrollView, Button, Pressable } from "react-native";
import Issue from "../components/Issue";

const issuesUrl = "http://joincanyon.org/issues"

export default function Issues() {
    const [issues, setIssues] = React.useState([])
    const tokenContext = useContext(AuthContext);
    
    const getIssues = async (token) => {
        const url = issuesUrl + "/6614b5ea364d756b23e35f9b"
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            }
        };
        const response = await fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    console.log("Bad token: " + token)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).then((data) => {
                return data;
            })
        console.log(response)
        setIssues(response);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textStyle}>Issues</Text>
            <Pressable style={styles.button} onPress={() => {
                getIssues(tokenContext[0]);
            }}>
                <Text style={{ textAlign: "center" }}>Get Issues</Text>
            </Pressable>

            {issues.map((issue) => (
                <Issue issue={issue} key={issue.id} />
            ))}
        </ScrollView>
    );
}

const styles = {
    container: {
        backgroundColor: "#121418",
        flex: 1,
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
