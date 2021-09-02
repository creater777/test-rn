import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';

import AppHeader from './AppHeader';
import ListItem from '../views/ListItem';
import {styles} from '../helpers';
import {request as requestApi} from '../store/events.store';
import {REFRESH_TIMEOUT} from '../config';

const setRefreshTimer = (setTimer, request) => {
  request();
  setTimer(() => setInterval(request, REFRESH_TIMEOUT * 1000));
};

const clearRefreshTimer = (setTimer, timer) =>
  timer && clearInterval(timer) && setTimer(null);

const EventList = ({data, request, route, navigation}) => {
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    navigation.addListener('focus', () => setRefreshTimer(setTimer, request));
  }, [navigation, setTimer, request]);

  useEffect(() => {
    navigation.addListener('blur', () => clearRefreshTimer(setTimer, timer));
  }, [navigation, setTimer, timer]);

  return (
    <View style={styles.container}>
      <AppHeader />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  data: store.data,
});

export default connect(mapStateToProps, {request: requestApi})(EventList);
