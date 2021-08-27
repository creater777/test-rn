import moment from "moment";
import {StyleSheet} from "react-native";

export const parseDate = date => {
    moment.defaultFormat= "YYYY-MM-DDTHH:mm:ss3Z";
    const d = moment(date);
    return {
        date: d.format("DD.MM.YY"),
        time: d.format("HH:mm")
    }
};

export const styles = StyleSheet.create({
    container: {
        top: "2em",
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    }
});
