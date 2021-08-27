import React from 'react';
import {Button} from 'react-native';
import {withRouter} from 'react-router-native';

const AppHeader = withRouter(({title, id, history}) =>
    <Button
        title="Назад"
        onPress={() => history.goBack()}
    />
);

export default AppHeader;
