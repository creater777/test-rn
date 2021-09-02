import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useRoute, useNavigation} from '@react-navigation/native';

import {request} from '../store/events.store';
import {styles} from '../helpers';

const AppHeader = ({error, loading, page, toUpdate, request}) => {
  const route = useRoute();
  const navigation = useNavigation();
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
      <Spinner visible={loading} />
    </View>
  );
};

const mapStateToProps = store => ({
  page: store.page,
  toUpdate: !store.toUpdate,
  loading: store.loading,
  error: store.error,
});

export default connect(mapStateToProps, {request})(AppHeader);
