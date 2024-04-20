import { StyleSheet } from "react-native";
import { colors } from "./colors";

// import in other stylesheets that will need these styles with `...shared,` as the first item in the StyleSheet.create object
export const shared = StyleSheet.create({
    title: {
        color: colors.textPrimary,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    heading: { // main text
        color: colors.textPrimary,
        fontSize: 24,
        marginTop: 15,
        fontWeight: 'bold',
    },
    paragraph: { // body text
        color: colors.textPrimary,
        fontSize: 18,
    },
    note: { // note text
        color: colors.textSecondary,
        fontSize: 14,
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
        paddingVertical: 80,
        backgroundColor: colors.background,
        alignItems: 'center',
        flex: 1,
    },
    scrollView: { // scroll view specific style for background outside of view 
        backgroundColor: colors.background,
    },
    body: { // contains all content on the page
        width: '90%',
        justifyContent: 'center',
        alignItems: 'left',
    },
    content: { // flex container for content using map()
        display: 'flex',
        gap: 15,
        marginVertical: 15,
        alignItems: 'center',
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
    }
});