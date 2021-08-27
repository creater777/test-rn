import React from 'react';
import {NativeRouter, Route, Switch} from 'react-router-native';

import EventList from './src/components/EventList';
import EventDetail from './src/components/EventDetail';
import EventContext from './src/context/EventsContext';
import {useEvents} from "./src/hooks/events.hook";

export default function App() {
    const {error, loading, page, events, setPage, update} = useEvents();
    return (
        <EventContext.Provider value={{error, loading, page, events, setPage, update}}>
            <NativeRouter>
                <Switch>
                    <Route path="/item/:id" component={EventDetail}/>
                    <Route path="/" component={EventList}/>
                </Switch>
            </NativeRouter>
        </EventContext.Provider>

    );
}
