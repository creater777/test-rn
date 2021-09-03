import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {request} from '../store/events.store';
import {styles} from '../helpers';
import Loading from './Loading';

const AppHeader = ({error, loading, toUpdate, request}) => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log('render AppHeader');
  return (
    <View>
      {route.name !== 'EventList' && (
        <Button
          title="Назад"
          onPress={navigation.goBack}
          disabled={!navigation.canGoBack()}
        />
      )}
      {route.name === 'EventList' && (
        <Button title="Обновить" onPress={request} disabled={!toUpdate} />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <Loading />
    </View>
  );
};

const mapStateToProps = store => ({
  toUpdate: !store.toUpdate,
  error: store.error,
});

export default connect(mapStateToProps, {request})(AppHeader);
