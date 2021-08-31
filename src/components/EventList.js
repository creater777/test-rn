import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';

import AppHeader from './AppHeader';
import ListItem from '../views/ListItem';
import {styles} from '../helpers';
import {request} from '../store/events.store';

const EventList = ({data, page, request, route, navigation}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      route.name === 'EventList' && request(page);
    }, 60000);
    request(page);
    return () => clearInterval(timer);
  }, [page]);

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
