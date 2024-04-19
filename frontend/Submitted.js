import React from "react";
import { Text, View, Pressable, TextInput } from "react-native";

export default function Submitted({ data, textInputs, onChangeText }) {
  const [onEdit, setOnEdit] = React.useState(false);

  const getGroupId = () => {
    const url = "http://joincanyon.org/groups?limit=1"
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMzExNjU2LCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMzMTE2NTYsImV4cCI6MTcxMzMxNTI1NiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.kDG5NKGGJigBPUsxkmr7RjrYtv549UOrdrQ0x0XqsM2w__wfrJrKZ_2kRgWr2IPlM69Nz3ycqui6qxCx7NVJFXQWlsx_-xiFCCMjJ-XPL7qiTgdahUYZr0sMMpQZKg3uZuA-6xOsc_0NkRpG8iMeHrTZRRf9mC_GTr2frVEFBfhu0P8Z286S4Hr7zgZjWhNm3oHgV3Xpjv8PDWNJAhyQSL5Eu44H8GCNEtrprVGRRLLRoLcKuyqSI_BVteSTONLIeSyLkZpOuoL8bnCMgU6wFvOBivu756XkcGV2bdCMKQGjvS6aL0UeGlySGngw5eB6ntUc6mZHeaPOgdi07yH7nA",
        }
      }
    fetch(url, options)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data[0].id
      })
    };

    const groupId = getGroupId();

  const postResponse = (param) => {
    const url = "http://joincanyon.org/responses"
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FueW9uLTUyZDY2IiwiYXVkIjoiY2FueW9uLTUyZDY2IiwiYXV0aF90aW1lIjoxNzEzMzExNjU2LCJ1c2VyX2lkIjoiZzIzS01kZXJHOVVjZ2QySWhYbkhFMTBUeVBVMiIsInN1YiI6ImcyM0tNZGVyRzlVY2dkMkloWG5IRTEwVHlQVTIiLCJpYXQiOjE3MTMzMTE2NTYsImV4cCI6MTcxMzMxNTI1NiwiZW1haWwiOiJhbmRyZXdsdWx1MjAxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW5kcmV3bHVsdTIwMTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.kDG5NKGGJigBPUsxkmr7RjrYtv549UOrdrQ0x0XqsM2w__wfrJrKZ_2kRgWr2IPlM69Nz3ycqui6qxCx7NVJFXQWlsx_-xiFCCMjJ-XPL7qiTgdahUYZr0sMMpQZKg3uZuA-6xOsc_0NkRpG8iMeHrTZRRf9mC_GTr2frVEFBfhu0P8Z286S4Hr7zgZjWhNm3oHgV3Xpjv8PDWNJAhyQSL5Eu44H8GCNEtrprVGRRLLRoLcKuyqSI_BVteSTONLIeSyLkZpOuoL8bnCMgU6wFvOBivu756XkcGV2bdCMKQGjvS6aL0UeGlySGngw5eB6ntUc6mZHeaPOgdi07yH7nA",
        },
        body: {
            "groupId": groupId,
            "response": param
        }
      }
    fetch(url, options)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
    };

  return (
    <View>
      <View>
        <Text style={styles.thankYou}>
          Thank you for submitting this week's questions.
        </Text>
        {data.slice(0, 3).map((item) => (
          <View key={item.id}>
            <Text style={styles.options}>{item.key}</Text>
            <TextInput
              style={onEdit ? styles.editable : styles.input}
              onChangeText={(newText) => onChangeText(item.id, newText)}
              value={textInputs[item.id]}
              placeholder="Enter answer here"
              placeholderTextColor="#6C6E77"
              editable={!onEdit ? false : true}
            />
          </View>
        ))}
      </View>
      {onEdit ? (
        <Pressable style={styles.sched} onPress={() => setOnEdit(false)}>
          <Text style={{ textAlign: "center" }}>Save</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.sched} onPress={() => setOnEdit(true)}>
          <Text style={{ textAlign: "center" }}>Edit</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = {
  textStyle: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 19,
    color: "#FFFFFF",
  },
  sub: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#6C6E77",
  },
  options: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: "#FFFFFF",
  },
  input: {
    height: 35,
    margin: 12,
    borderRadius: 4,
    // backgroundColor: "#1E2029",
    color: "#FFFFFF",
    // padding: 10,
  },
  sched: {
    padding: 10,
    color: "black",
    borderRadius: 8,
    marginLeft: "auto",
    marginTop: 20,
    marginRight: 10,
    width: 120,
    backgroundColor: "#C9DBC9",
  },
  thankYou: {
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    color: "white",
  },
  editable: {
    height: 35,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#1E2029",
    color: "#FFFFFF",
  },
};
