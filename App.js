import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

import EventList from './src/components/EventList';
import EventDetail from './src/components/EventDetail';
import eventReducer from './src/store/events.store';
import AppHeader from "./src/components/AppHeader";

const store = createStore(eventReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

export default function App() {
    console.log('app render');
    return (
        <Provider store={store}>
            <NavigationContainer initialRouteName="EventList">
                <Stack.Navigator detachInactiveScreens={true} detachPreviousScreen={true}>
                    <Stack.Screen name="EventList" component={EventList} header={AppHeader}/>
                    <Stack.Screen name="EventDetail" component={EventDetail} header={AppHeader}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}
