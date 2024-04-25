import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AuthContext } from "../store/auth";
import { InfoContext } from "../store/info";
import { SelfContext } from "../store/self";
import { styles } from "../styles/Home";
import { colors } from "../styles/colors";

export default function ResponsesPage() {
  const groupsContext = useContext(InfoContext);
  const groups = groupsContext[0];
  const setGroups = groupsContext[1];
  const token = useContext(AuthContext)[0];
  const self = useContext(SelfContext)[0];
  const setSelf = useContext(SelfContext)[1];
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [groupName, setGroupName] = useState("");

  const fetchGroups = async () => {
    const url = `http://joincanyon.org/groups`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });

    setGroups(response);
  };

  const fetchSelf = async () => {
    const url = `http://joincanyon.org/users`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });

    setSelf(response);
  };

  const createGroup = async () => {
    if (groupName === "") {
      return;
    }

    const url = `http://joincanyon.org/groups`;
    const options = {
      method: "POST",
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });

    setGroups([...groups, response]);
    setCreating(false);
    return;
  };

  const joinGroup = async () => {
    if (groupName === "") {
      return;
    }

    const url = `http://joincanyon.org/groups/${groupName}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
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
    <ScrollView style={[styles.scrollView, groupStyles.parentContainer]}>
      <View style={styles.body}>
        {/* self ? is to prevent crash while fetchSelf is getting self */}
        <Text style={styles.title}>
          Welcome back{" "}
          <Text style={{ color: colors.primary }}>
            {self ? self.name.split(" ")[0] : null}
          </Text>
          !
        </Text>
        <Text style={styles.heading}>Check out your previous responses 🙌</Text>

        <View style={styles.content}>
          {groups.map((group) => (
            // <Response key={group.id} group={group} />
            <View key={group.id}>
              <Text style={[styles.heading, { color:colors.secondary }]}>
                {group.name}
              </Text>
              <Text style={styles.paragraph}>
                {group.members.map((member) => member.name).join(", ")}
              </Text>
              <Text style={[styles.heading, { alignSelf: "flex-start" }]}>
                Previous Questions
              </Text>
              {[...group.issues]
                .reverse()
                .slice(1)
                .map((q) => (
                  // TODO: take answers component from AnswerPage and put here, minus the editing - instead, opening should display the responses for that issue
                  <View key={q.id}>
                    <Text style={groupStyles.option}>{q.question}</Text>
                    {/* <Text style={groupStyles.option}>{q.date}</Text> */}
                    {console.log(q)}
                    {q.responses.map((r) => (
                      <View key={r.id} style={groupStyles.responseContainer}>
                        {/* <Image
                          style={styles.image}
                          source={require("./old/ex.png")}
                        /> */}
                        <View>
                          <Text style={groupStyles.name}>{r.user.name}</Text>
                          <Text style={groupStyles.text}>{r.response}</Text>
                        </View>
                      </View>
                    ))}
                    {q.responses.length < 1 ? (
                      <Text style={groupStyles.name}>No answers yet!</Text>
                    ) : null}
                    {/* <View style={styles.container}>
                    <Image style={styles.image} source={require("./ex.png")} />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{person}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    </View> */}
                  </View>
                ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const groupStyles = {
  responseContainer: {
    flexDirection: "column", // Align children in a row
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: "#1E2029",
    padding: 15,
    width: "110%",
    alignItems: "flex-start", // Align items in the center vertically
  },
  parentContainer: {
    paddingTop: 70,
    paddingLeft: 20,
  },
  name: {
    color: "#6C6E77",
    marginBottom: 5,
  },
  text: {
    color: "#FFFFFF",
    paddingRight: 40,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20, // This makes it a circle
  },
  option: {
    marginBottom: 12,
    marginTop: 12,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
};
