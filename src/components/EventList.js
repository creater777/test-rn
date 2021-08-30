import React, {useEffect} from "react";
import {FlatList, Text, View} from "react-native";
import {connect} from 'react-redux'

import AppHeader from "./AppHeader";
import ListItem from "../views/ListItem";
import {styles} from "../helpers";
import {request} from "../store/events.store";

const EventList = ({data, page, request, route, navigation}) => {

    navigation.addListener("onFocus", () => console.log('onFocus'))

    useEffect(() => {
        const timer = setInterval(() => {
            route.name === "EventList" && request(page)
        }, 60000);
        console.log('mount')
        request(page);
        return () => console.log(clearInterval(timer))
    }, []);

    return (
        <View style={styles.container}>
            <AppHeader/>
            <Text>Страница {page}</Text>
            <FlatList
                data={data || []}
                renderItem={ListItem}
            />
        </View>
    )
};

const mapStateToProps = (store, ownProps) => ({
    page: store.page,
    data: store.data
});

export default connect(mapStateToProps, {request})(EventList)
