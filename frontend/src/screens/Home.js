import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import AuthContext from '../store/AuthContext';
import Group from '../components/Group';
import { styles } from '../styles/Home';

export default function Home() {
    const [groups, setGroups] = useState([]);
    const tokenContext = useContext(AuthContext);

    // load groups on login
    useEffect(() => {
        const fetchGroups = async () => {
            const url = `http://joincanyon.org/groups`;
            const options = {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: "Bearer " + tokenContext[0],
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
                    console.log(data);
                    return data;
                });
    
            setGroups(response);
        };

        fetchGroups();
    }, []);

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.body}>
                <Text style={styles.heading}>Your Groups</Text>
                <View style={styles.content}>
                    {groups.map((group) => (
                        <Group key={group.id} group={group} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
