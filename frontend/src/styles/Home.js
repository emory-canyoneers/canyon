import { StyleSheet } from "react-native";
import { shared } from "./shared";

export const styles = StyleSheet.create({
    ...shared,
    subcontent: { // content without margin
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
