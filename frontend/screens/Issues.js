import React, { useEffect } from "react";
import { Text, ScrollView, Button } from "react-native";

const issuesUrl = "http://joincanyon.org/issues"
const creds = require("./secret.json")


const login = () => {
    const url = "http://joincanyon.org/auth";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(creds)
    };
    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log(data.token);
            return data.token;
        });
    };

const getIssues = () => {
    const url = issuesUrl + "/6614b5ea364d756b23e35f9b"
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMjk4MTAyLCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMyOTgxMDIsImV4cCI6MTcxMzMwMTcwMiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Qdhn_Xt_XNMSKMZ73NNHCVEWrQypPRzBF2Wx1-9uaJHcm9LmlRn1eVyTQlVRptuLv1CRd3ATOUpVi-Yn6p7W33mf6SDCT5N2M8OO4k1MVY6UEHD4IBv6I-as6YX9m81i1hWP7ST6wNUQDP1-wUzLG4kl9RHGyfpb-tTTRm4TECP0Q1xA9HLbEOiWBjZfTu41GVp3AYEizT7dOUKkc2Cg4EiQhcCv4MXTWoEPH5066FEm2YnAxjPubwwEHutE3yPKqy2iX-xjfYhfsDIuP98wefzV-pDBQL-_gkpgMljJCDO-HbVjCzQTirbI-tMOhhsSpdJ96H0HgC1pYldpDG4eQg"
        }
    };
    fetch(url, options).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        console.log(data);
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
                const issues = await login()
                setIssues(issues)
            }} />
        </ScrollView>
    );
}

const styles = {
    container: {
        backgroundColor: "#1E2029",
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 100
    }
}
