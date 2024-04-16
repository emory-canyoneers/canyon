import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Group from './Group';

export default Page = ({userId}) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // const [groups] = useState([
  //     {
  //       name: "Group 1", 
  //       users: [
  //         {name: "Lindsay"},
  //         {name: "James"},
  //         {name: "Jerry"},
  //       ]
  //     },
  //     {
  //       name: "Group 2",
  //       users: [
  //         {name: "Tom"},
  //         {name: "Shalya"},
  //         {name: "Sally"},
  //       ]
  //     }
  // ]);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try{
        const response = await fetch(`http://joincanyon.org/${userId}/groups`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer kfjghklshfissduh"
        }
      }); 
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchGroups();
  }, [userId]);

  if(loading){
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textStyle}>Your Groups</Text>
      {groups.map((group, index) => (
        <Group key={index} group={group}/>
      ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121418",
    flex: 1,
  },
  textStyle: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 10,
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
});