import React, { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from "../store/auth";
import { InfoContext } from "../store/info";
import Group from '../components/Group';
import { styles } from '../styles/Home';
import { colors } from '../styles/colors';
import { SelfContext } from '../store/self';

export default function Home() {
    const groupsContext = useContext(InfoContext);
    const groups = groupsContext[0];
    const setGroups = groupsContext[1];
    const token = useContext(AuthContext)[0];
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
                <Text style={styles.title}>Welcome back!</Text>
                <Text style={styles.heading}>Check in on your groups:</Text>
                <View style={styles.content}>
                    {groups.map((group) => (
                        <Group key={group.id} group={group} />
                    ))}
                </View>
                
                <Text style={styles.heading}>Or...</Text>
                <View style={styles.content}>
                    <View style={styles.horizontalWrapper}>
                        <TouchableOpacity style={styles.flexButton} onPress={() => {
                            setJoining((j) => !j);
                            setCreating(false);
                        }}>
                            <Text>Join a Group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flexButton} onPress={() => {
                            setCreating((c) => !c);
                            setJoining(false);
                        }}>
                            <Text>Create a Group</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        creating ? (
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="New Group Name"
                                    placeholderTextColor={colors.textSecondary}
                                    onChangeText={setGroupName}
                                    value={groupName}
                                />
                                
                                <TouchableOpacity style={styles.button} onPress={createGroup}>
                                    <Text>Create Group</Text>
                                </TouchableOpacity>
                            </View>
                        ) : <></>
                    }
                    {
                        joining ? (
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Group Code"
                                    placeholderTextColor={colors.textSecondary}
                                    onChangeText={setGroupName}
                                    value={groupName}
                                />
                                <TouchableOpacity style={styles.button} onPress={joinGroup}>
                                    <Text>Join Group</Text>
                                </TouchableOpacity>
                            </View>
                        ) : <></>
                    }
                </View>
            </View>
        </ScrollView>
    );
}
