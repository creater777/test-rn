import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import EventList from './src/components/EventList';
import EventDetail from './src/components/EventDetail';
import eventReducer from './src/store/events.store';

const store = createStore(eventReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName="EventList">
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="EventList" component={EventList} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
