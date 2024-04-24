import { useContext } from 'react';
import { Text, View } from 'react-native';
import { GroupContext } from "../store/pick";


export default PickPage = () => {
    const [group, setGroup] = useContext(GroupContext);

    //filler group data 
    const handleSetGroup = () => {
        setGroup(
            {
                "id": "6622cc97f132db149d4c856a",
                "name": "Andrew’s Group",
                "issueCount": 3,
                "issueFrequency": 30,
                "owner": {
                    "id": "6622c3c5f132db149d4c8569",
                    "name": "Andrew Lu",
                    "email": "andrewlulu2012@gmail.com",
                    "groups": [
                        "6622cc97f132db149d4c856a",
                        "6622de4ff132db149d4c8579"
                    ]
                },
                "members": [
                    {
                        "id": "6622c3c5f132db149d4c8569",
                        "name": "Andrew Lu",
                        "email": "andrewlulu2012@gmail.com",
                        "groups": [
                            "6622cc97f132db149d4c856a",
                            "6622de4ff132db149d4c8579"
                        ]
                    },
                    {
                        "id": "6622cde6f132db149d4c856c",
                        "name": "Andrew Lu",
                        "email": "andrew.lu@emory.edu",
                        "groups": [
                            "6622cc97f132db149d4c856a"
                        ]
                    }
                ],
                "issues": [
                    {
                        "id": "662325f2f0eab66ae8ef6430",
                        "issueNumber": 1,
                        "time": "02:18:26.624",
                        "question": "Que pasa guey 1?",
                        "group": "6622cc97f132db149d4c856a",
                        "responses": []
                    },
                    {
                        "id": "66232629f0eab66ae8ef6437",
                        "issueNumber": 2,
                        "time": "02:19:21.35",
                        "question": "Que pasa guey 2?",
                        "group": "6622cc97f132db149d4c856a",
                        "responses": []
                    },
                    {
                        "id": "66232a35f0eab66ae8ef645f",
                        "issueNumber": 3,
                        "time": "02:36:37.085",
                        "question": "Que pasa guey 3?",
                        "group": "6622cc97f132db149d4c856a",
                        "responses": [
                            {
                                "id": "662557862ab37b55aa8697ae",
                                "response": "Hello",
                                "user": {
                                    "id": "6622c3c5f132db149d4c8569",
                                    "name": "Andrew Lu",
                                    "email": "andrewlulu2012@gmail.com",
                                    "groups": [
                                        "6622cc97f132db149d4c856a",
                                        "6622de4ff132db149d4c8579"
                                    ]
                                },
                                "group": "6622cc97f132db149d4c856a",
                                "issue": "66232a35f0eab66ae8ef645f"
                            },
                            {
                                "id": "662582e72ab37b55aa86981c",
                                "response": "Hello!",
                                "user": {
                                    "id": "6622c3c5f132db149d4c8569",
                                    "name": "Andrew Lu",
                                    "email": "andrewlulu2012@gmail.com",
                                    "groups": [
                                        "6622cc97f132db149d4c856a",
                                        "6622de4ff132db149d4c8579"
                                    ]
                                },
                                "group": "6622cc97f132db149d4c856a",
                                "issue": "66232a35f0eab66ae8ef645f"
                            },
                            {
                                "id": "6625830f2ab37b55aa869826",
                                "response": "computer",
                                "user": {
                                    "id": "6622c3c5f132db149d4c8569",
                                    "name": "Andrew Lu",
                                    "email": "andrewlulu2012@gmail.com",
                                    "groups": [
                                        "6622cc97f132db149d4c856a",
                                        "6622de4ff132db149d4c8579"
                                    ]
                                },
                                "group": "6622cc97f132db149d4c856a",
                                "issue": "66232a35f0eab66ae8ef645f"
                            },
                            {
                                "id": "6625bde02ab37b55aa869832",
                                "response": "I love Suzy??",
                                "user": {
                                    "id": "6622c3c5f132db149d4c8569",
                                    "name": "Andrew Lu",
                                    "email": "andrewlulu2012@gmail.com",
                                    "groups": [
                                        "6622cc97f132db149d4c856a",
                                        "6622de4ff132db149d4c8579"
                                    ]
                                },
                                "group": "6622cc97f132db149d4c856a",
                                "issue": "66232a35f0eab66ae8ef645f"
                            },
                            {
                                "id": "662679a0dd48f629d7ae3f05",
                                "response": "Hello",
                                "user": {
                                    "id": "6622c3c5f132db149d4c8569",
                                    "name": "Andrew Lu",
                                    "email": "andrewlulu2012@gmail.com",
                                    "groups": [
                                        "6622cc97f132db149d4c856a",
                                        "6622de4ff132db149d4c8579"
                                    ]
                                },
                                "group": "6622cc97f132db149d4c856a",
                                "issue": "66232a35f0eab66ae8ef645f"
                            }
                        ]
                    }
                ]
            }
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Set Group Ig</Text>
            <Button
                title="Change Context"
                onPress={handleSetGroup}
            />
        </View>
    );
};
