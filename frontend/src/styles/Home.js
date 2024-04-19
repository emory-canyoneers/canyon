import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { shared } from "./shared";

export const styles = StyleSheet.create({
    ...shared,
    textStyle: {
        fontWeight: "bold",
        paddingTop: 70,
        paddingBottom: 10,
        fontSize: 30,
        color: "white",
        textAlign: "center",
    },
    sub: {
        padding: 10,
        fontSize: 18,
        color: "#6C6E77",
    }
});
