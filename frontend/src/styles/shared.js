import { StyleSheet } from "react-native";
import { colors } from "./colors";

// import in other stylesheets that will need these styles with `...shared,` as the first item in the StyleSheet.create object
export const shared = StyleSheet.create({
    heading: { // main text
        color: colors.textPrimary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: { // buttons
        backgroundColor: colors.element,
        width: '100%',
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
        width: '80%',
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
});