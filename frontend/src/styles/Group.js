import { StyleSheet } from "react-native";
import { shared } from "./shared";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    ...shared,
    subcontainer: {
        width: "100%",
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: colors.elementDark,
        alignItems: "center", // Align items in the center vertically
    },
    paneContent: {
        width: "100%",
        gap: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    modal: {
        paddingVertical: 60,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    exit: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
