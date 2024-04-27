import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

// import in other stylesheets that will need these styles with `...shared,` as the first item in the StyleSheet.create object
export const shared = StyleSheet.create({
    title: {
        color: colors.textPrimary,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    heading: { // main text
        color: colors.textPrimary,
        fontSize: 24,
        marginTop: 15,
        fontWeight: 'bold',
    },
    subheading: { // subheading text
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    paragraph: { // body text
        color: colors.textPrimary,
        fontSize: 18,
    },
    note: { // note text
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: "left",
    },
    button: { // buttons
        backgroundColor: colors.element,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    flexButton: { // flex buttons
        backgroundColor: colors.element,
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    link: { // links
        color: colors.textSecondary,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    container: { // outermost view, provides top padding and centering margins
        paddingTop: 80,
        backgroundColor: colors.background,
        alignItems: 'center',
        // flex: 1,
    },
    scrollView: { // scroll view specific style for background outside of view 
        backgroundColor: colors.background,
    },
    body: { // contains all content on the page
        width: '90%',
        justifyContent: 'center',
        alignItems: 'left',
        paddingBottom: 80,
    },
    content: { // flex container for content using map()
        display: 'flex',
        gap: 15,
        marginVertical: 15,
        alignItems: 'left',
        justifyContent: 'center',
        width: '100%',
    },
    horizontalWrapper: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.textPrimary,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    answer_input: {
        height: 40, 
        margin: 12, 
        borderWidth: 1,
        padding: 10,
        width: Dimensions.get('window').width * 0.8,
        color: colors.textPrimary
    },
    centeredView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22, 
        backgroundColor: 'rgba(0,0,0,0.5)', //makes the background semi-transparent 
    },
    modalView:{
        margin: 20,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: colors.background,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    questionInModal: {
        color: 'white',
        fontWeight: 'bold'
    },
    questionbutton: {
        backgroundColor:"#FAC898",
        width: Dimensions.get('window').width * 0.9,
        padding: 10,
        borderRadius: 5,
        // justifyContent: 'center',
        // alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});