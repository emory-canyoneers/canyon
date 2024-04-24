import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AuthContext } from "../store/auth";
import { InfoContext } from "../store/info";
import { SelfContext } from '../store/self';
import { styles } from '../styles/Home';
import { colors } from '../styles/colors';


export default function ResponsesPage() {
    const groupsContext = useContext(InfoContext);
    const groups = groupsContext[0];
    const setGroups = groupsContext[1];
    const token = useContext(AuthContext)[0];
    const self = useContext(SelfContext)[0];
    const setSelf = useContext(SelfContext)[1];
    const [creating, setCreating] = useState(false);
    const [joining, setJoining] = useState(false);
    const [groupName, setGroupName] = useState('');

    const fetchGroups = async () => {
        const url = `http://joincanyon.org/groups`;
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token,
            }
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setGroups(response);
    };

    const fetchSelf = async () => {
        const url = `http://joincanyon.org/users`;
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token,
            }
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setSelf(response);
    };

    const createGroup = async () => {
        if (groupName === '') {
            return;
        }

        const url = `http://joincanyon.org/groups`;
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name: groupName,
            }),
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setGroups([...groups, response]);
        setCreating(false);
        return;
    };

    const joinGroup = async () => {
        if (groupName === '') {
            return;
        }

        const url = `http://joincanyon.org/groups/${groupName}`;
        const options = {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        };

        const response = await fetch(url, options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                return data;
            });

        setGroups([...groups, response]);
        setJoining(false);
        return;
    };

    // load groups on login
    useEffect(() => {
        fetchGroups();
        fetchSelf();
    }, []);

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.body}>
                {/* self ? is to prevent crash while fetchSelf is getting self */}
                <Text style={styles.title}>
                    Welcome back <Text style={{color: colors.primary}}>{self ? self.name.split(" ")[0] : null}</Text>!
                </Text>
                <Text style={styles.heading}>Check in on your groups:</Text>
                <View style={styles.content}>
                    {groups.map((group) => (
                        // <Response key={group.id} group={group} />
                        <View key={group.id}>
                            <Text style={styles.heading}>{group.name}</Text>
                            {
                                group.members.map((member) => (
                                    <View key={member.id} style={styles.subcontent}>
                                        <Text style={styles.paragraph}>{member.name}</Text>
                                    </View>
                                ))
                            }
                            <Text style={[styles.heading, {alignSelf: "flex-start"}]}>Previous Questions</Text>
                                    {
                                        [...group.issues].reverse().slice(1).map((q) => (
                                            // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                                            <View key={q.id}>
                                                <Text style={{color: 'white', fontWeight: 'bold'}}>{q.question}</Text>
                                                {
                                                    q.responses.map((r) => (
                                                        <View key={r.id}>
                                                            <Text style={{color: 'white'}}>{r.user.name}: {r.response}</Text>
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        ))
                                    }
                                </View>
                            ))}
                </View>
            </View>
        </ScrollView>
    );
}
