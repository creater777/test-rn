import React from 'react'
import {Text, View} from "react-native";
import {Link, withRouter} from 'react-router-native'
import {parseDate, styles} from "../helpers"

export default withRouter(({index, item}) => {
    const date=item && parseDate(item.created_at) || {};
    return <View style={styles.row}>
        <Link
            to={`/item/${item.id}`}
            style={styles.rowNum}
            replace={true}
        ><Text>{index}. {date.date} {date.time} {item.actor.login}</Text></Link>
    </View>
})
