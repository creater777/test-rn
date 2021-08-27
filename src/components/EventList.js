import React, {useEffect, useContext} from "react";
import {FlatList, Text, View} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import AppHeader from "../views/AppHeader";
import ListItem from "../views/ListItem";
import EventsContext from "../context/EventsContext";
import {styles} from "../helpers"

export default () => {
    const {error, loading, page, events, setPage, update} = useContext(EventsContext);

    useEffect(() => {
        const timer = setInterval(() => {
            update(page);
        }, 60000);
        return () => { clearInterval(timer)}
    }, [page]);

    return (
        <View style={styles.container}>
            <AppHeader page={page} setPage={setPage}/>
            <Spinner visible={loading}/>
            {error && <Text>{error}</Text>}
            <Text>Страница {page}</Text>
            <FlatList
                data={events || []}
                renderItem={ListItem}
            />
        </View>
    )
}
