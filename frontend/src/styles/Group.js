import { StyleSheet } from "react-native";
import { shared } from "./shared";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    ...shared,
    container: {
        width: "100%",
        flexDirection: "column",
        borderRadius: 4,
        backgroundColor: colors.elementDark,
        alignItems: "center", // Align items in the center vertically
    },
    content: {
        width: "100%",
        gap: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
