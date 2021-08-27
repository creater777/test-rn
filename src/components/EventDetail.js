import React, {useContext} from 'react'
import {Text, View} from "react-native";

import {parseDate, styles} from '../helpers'
import EventContext from '../context/EventsContext'

export default ({item, id, match}) => {
    const context = useContext(EventContext);
    const event = context.events.find(event => match.params.id === event.id);
    const created = parseDate(event.created_at);

    return (
        <View style={styles.container}>
            <Text>Детали события</Text>
            <Text>Создан: {created.date} {created.time}</Text>
            <Text>Автор: {event.actor.login}</Text>
            <Text>Тип: {event.type}</Text>
            <Text>Репозиторий: {event.repo.name}</Text>
        </View>
    )
}
