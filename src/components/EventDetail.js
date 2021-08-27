import React, {useContext} from "react"
import {Text, View} from "react-native";
import _ from "lodash";

import {parseDate, styles} from "../helpers"
import EventContext from "../context/EventsContext"
import AppHeader from "../views/AppHeader";

const PushEvent = ({event}) =>(
    <View>
        <Text>Комммиты:</Text>
        {console.log(event)}
        {_.get(event, "payload.commits", []).map(
            commit => <Text key={commit.sha}>Сообщение: {commit.message}</Text>
        )}
    </View>
)

export default ({item, id, match}) => {
    const context = useContext(EventContext);
    const event = context.events.find(event => match.params.id === event.id);
    const created = event && parseDate(event.created_at);
    return (
        <View style={styles.container}>
            {context && <AppHeader page={context.page} setPage={context.setPage}/>}
            <Text>Детали события</Text>
            <Text>Создан: {created && created.date} {created && created.time}</Text>
            <Text>Автор: {event && event.actor.login}</Text>
            <Text>Тип: {event && event.type}</Text>
            <Text>Репозиторий: {event && event.repo.name}</Text>
            {_.get(event, "type", false) && (event.type === "PushEvent") && <PushEvent event={event}/>}
        </View>
    )
}
