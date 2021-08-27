import React from "react"
import {StyleSheet, Text, View} from "react-native";
import {Link, withRouter} from "react-router-native"
import {parseDate, styles} from "../helpers"

export default withRouter(({item}) => {
    const date=item && parseDate(item.created_at) || {};
    return <View style={styles.row}>
        <Link
            to={`/item/${item.id}`}
            style={styles.rowNum}
            replace={true}
        ><Text>{date.date} {date.time} {item.actor.login}</Text></Link>
    </View>
})
