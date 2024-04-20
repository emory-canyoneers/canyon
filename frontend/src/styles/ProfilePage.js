import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { shared } from "./shared";

export const styles = StyleSheet.create({
    ...shared,
    loginContent: {
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        paddingTop: 80,
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
    name: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.textPrimary,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    credentials: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        color: colors.textPrimary,
        borderRadius: 5,
        paddingHorizontal: 10,
    }
});