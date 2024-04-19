import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import AuthContext from '../store/AuthContext';
import Group from '../components/Group';

export default Page = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenContext = useContext(AuthContext);

  const fetchGroups = async () => {
    try{
      setLoading(true);
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
    // } catch (error) {
    //   console.error("Failed to fetch groups", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textStyle}>Your Groups</Text>

      <Pressable style={styles.button} onPress={() => {
        fetchGroups()
      }}>
        <Text style={{ textAlign: "center" }}>Get Groups</Text>
      </Pressable>

      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}

    </ScrollView>
  );

  // if (groups) {
  //   return (
  //     <ScrollView style={styles.container}>
  //       <Text style={styles.textStyle}>Your Groups</Text>
  //       {groups.map((group, index) => (
  //         <Group key={index} group={group} />
  //       ))}
  //       </ScrollView>
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.textStyle}>No groups found</Text>
  //     </View>
  //   );
  
  // }
  
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
});
