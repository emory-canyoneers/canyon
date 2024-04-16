import React, { useEffect } from "react";
import { Text, ScrollView, Button } from "react-native";

const issuesUrl = "http://joincanyon.org/issues"
const creds = require("./secret.json")


// TODO: remove this function and use the login function from auth
const login = async () => {
    const url = "http://joincanyon.org/auth";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(creds)
    };
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            return data.token;
        });
};

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
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                console.log(token)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log(token)
            return data;
        })
};

export default function Issues() {
    const [issues, setIssues] = React.useState()

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Issues</Text>
            <Button title="Get Issues" onPress={async () => {
                // since getIssues is an async function, we need to await it or else will loop
                const token = await login();
                const issueData = await getIssues(token);
                setIssues(issueData);
            }} />
        </ScrollView>
    );
}

const styles = {
    container: {
        backgroundColor: "#1E2029",
        paddingTop: 80,
        flex: 1
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    }
}
