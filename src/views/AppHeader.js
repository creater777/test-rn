import React from "react";
import {Button, StyleSheet, View} from "react-native";
import {withRouter} from "react-router-native";

const AppHeader = withRouter(({page, setPage, history, location, ...router}) => (
        <View>
            <Button
                title="Назад"
                onPress={() => {
                    if (location.pathname === "/" && page > 0) {
                        setPage(page - 1)
                    }
                    history.push("/")
                }}
                disabled={location.pathname === "/" && page === 0}
            />
            {location.pathname === "/" && <Button
                title="Следующее"
                onPress={() => {
                    setPage(page + 1)
                }}
            />}
        </View>
    )
);

export default AppHeader;
