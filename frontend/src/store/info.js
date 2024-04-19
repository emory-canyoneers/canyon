import { createContext, useState } from 'react';

// Design choice: store all information from GET http://joincanyon.org/groups
// instead of sending GET requests in all pages, abstract away information fetching
// and keep in one place to access everywhere

// When data is updated, re-fetch data from server and update context

/* InfoContext stores the information provided by GET http://joincanyon.org/groups
* GET http://joincanyon.org/groups returns:
* List of groups
* Each group has:
* - id (string)
* - name (string)
* - issueCount (int)
* - owner (user)
* - members (list of users - type user)
* - issues (list of questions - type issue)
* 
* Each user has:
* - id (string)
* - name (string)
* - email (string)
* - groups (list of group IDs - type string)
* - fid (unused, string)
 * 
 * Each issue/question has:
 * - id (string)
 * - issue number (int)
 * - date (string)
 * - question (string)
 * - group (string)
 * - responses (list of answers - type response)
 * 
 * Each response/answer has:
 * - id (string)
 * - response (string)
 * - user (user object)
 * - group (ID string)
 * - issue (ID string)
*/

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
  
    return (
      <InfoContext.Provider value={[groups, setGroups]}>
        {children}
      </InfoContext.Provider>
    );
};

// helper functions to operate on data
export function getGroup(groups, id) {
    return groups.find(group => group.id === id);
}

export function getGroupQuestions(groups, groupId) {
    return getGroup(groups, groupId).issues;
}

export function getGroupMembers(groups, groupId) {
    return getGroup(groups, groupId).members;
}

export function getAllQuestions(groups) {
    answered = []
    unanswered = [];
    groups.forEach(group => {
        questions = group.issues
        if (group.issues.length > 0) {
            question = questions[questions.length - 1]
            questions.concat()
        }
    });

    return questions
}
