import moment from "moment";
import {StyleSheet} from "react-native";

export const parseDate = date => {
    moment.defaultFormat= "YYYY-MM-DDTHH:mm:ssZ";
    const d = moment(date);
    return {
        date: d.format("DD.MM.YY"),
        time: d.format("HH:mm")
    }
};

export const styles = StyleSheet.create({
    container: {
        // top: 20,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        paddingBottom: 40
    },
    row: {
        padding: 10
    }
});
