import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useRoute, useNavigation} from '@react-navigation/native';

import {setPage} from '../store/events.store';

const AppHeader = ({error, loading, page, setPage}) => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Назад"
        onPress={() => {
          if (route.name === 'EventList' && page > 0) {
            setPage(page - 1);
          } else {
            navigation.navigate('EventList');
          }
        }}
        disabled={route.name === 'EventList' && page === 0}
      />
      {route.name === 'EventList' && (
        <Button
          title="Следующее"
          onPress={() => {
            setPage(page + 1);
          }}
        />
      )}
      {error && <Text>{error}</Text>}
      <Spinner visible={loading} />
    </View>
  );
};

const mapStateToProps = store => ({
  page: store.page,
  loading: store.loading,
  error: store.error,
});

export default connect(mapStateToProps, {setPage})(AppHeader);
