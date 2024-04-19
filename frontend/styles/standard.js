import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    content: {
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '50%',
    },
    horizontalWrapper: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    heading: {
        color: colors.textMain,
        fontSize: 24,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.inputText,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    credentials: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.inputText,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.button,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    link: {
        color: colors.textSecondary,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    }
});