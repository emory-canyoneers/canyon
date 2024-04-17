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
        const url = `http://joincanyon.org/groups`;
        const options = {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMzc1NTQxLCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMzNzU1NDEsImV4cCI6MTcxMzM3OTE0MSwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jvq1JtihVs7W6rb6XG98O0wsaCguqaRVn9kKNXvDF9qEThPIZLPAkm1LpPeERrRQriIAugXYlQAVxMFtT7EQycsrvxT0gyi0YIq8thahq-JlVnw7dGPEHYo9FDmMPWbWDTu6oZvqX4Xa8y-iUTfL5eM3sgzeO5zgPIZB9r3RzdE7PbHg47iQv7gmugBD0Luv5HcFMaop2PtDbQj3i9Kh9FwURbc4id8XHQvypDnKL8mq6h-cpBdpsriIl8iYxFKLbQdOcGbUhe4rsX9nJUvf4bEmv46mPjm88dNaIedV8LnksHl-IC2RYaSlrKiRO9aWYWDvVFaFoFauCHB-ByfVBA"
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

  if (groups && groups.length > 0) {
    return (
      <div>
        {groups.map((group) => (
          <div key={group.id}>
            <h1>{group.name}</h1>
            <p>Members</p>
            {group.members.map((member) => (
              <p key={member}>{member}</p>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No groups found, loading?</div>
  }
  // return (
  //   <ScrollView style={styles.container}>
  //     <Text style={styles.textStyle}>Your Groups</Text>
  //     {groups.map((group, index) => (
  //       <Group key={group.id || index} group={group}/>
  //     ))}
  //     </ScrollView>
  // );
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
