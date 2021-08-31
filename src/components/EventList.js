import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';

import AppHeader from './AppHeader';
import ListItem from '../views/ListItem';
import {styles} from '../helpers';
import {request} from '../store/events.store';

const EventList = ({data, page, request, route, navigation}) => {
  const [timer, setTimer] = useState(null);
  useEffect(
    () =>
      navigation.addListener('focus', () => {
        request(page);
        setTimer(
          setInterval(() => {
            request(page);
          }, 60000),
        );
      }),
    [navigation, page, setTimer, request],
  );

  useEffect(
    () =>
      navigation.addListener(
        'blur',
        () => timer && clearInterval(timer) && setTimer(null),
      ),
    [navigation, setTimer, timer],
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>Страница {page}</Text>
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
  page: store.page,
  data: store.data,
});

export default connect(mapStateToProps, {request})(EventList);
