import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Group from './Group';

export default Page = () => {
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
      
      try{
        setLoading(true);
        const url = `https://joincanyon.org/groups`;
        const options = {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzNDEzMTQ4LCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTM0MTMxNDgsImV4cCI6MTcxMzQxNjc0OCwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.NBSbOEwbJ4Jpk3I7LqgqneoXtAnkogNdH5Iu2--mvGUZ0kUum8HrCuWxejOjlC8Ljn3oXOTsQRiArT2J-CY3fefHCV4b6dhEsowwUIQ-rNpQxzkMdA0EfvoIWJoL87emV1A-92gNt-49iir_7U5uWL8wK6NGgU2Hahjaguk4NMkIR2fex8S7SLaD3A-K8nqzAcO3e6BDvgrqApDvG99ZhH28QUhTW8rmG44Al81ptWGXipc2HZmI3HltCvJw-jnFiOKzxj2yDXPJk8R5GF_k_U71OFrEv00Q6cwWhK2S1NbbrLw94krztVdfZTRFtO682dHWKdCvHhkdPZBpYfa1Fw"
          }
        };

      console.log("Fetching from URL:", url);
      console.log("With headers:", options.headers);
      const response = await fetch(url, options)
        .then(response => {
          if(!response.ok){
            throw new Error('HTTP error: ${response.status}');
          }
          return response.json()
        })
        .then(data => {
          console.log(data)
          return data;
        });
      return response;
      } catch (error) {
        console.error("Failed to fetch groups", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      const response = await fetchGroups();
      console.log("Fetching groups... " + JSON.stringify(response));
      setGroups(response);
    };

    fetchData().then(() => setLoading(false));
  } , []);
     
  if(loading){
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (groups) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textStyle}>Your Groups</Text>
        {groups.map((group, index) => (
          <Group key={index} group={group} />
        ))}
        </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>No groups found</Text>
      </View>
    );
  
  }
  
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
