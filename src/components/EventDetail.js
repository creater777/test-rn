import React from 'react';
import {Text, View} from 'react-native';
import get from 'lodash/get';

import {parseDate, styles} from '../helpers';
import AppHeader from './AppHeader';
import {connect} from 'react-redux';

const PushEvent = ({event}) => (
  <View>
    <Text>Комммиты:</Text>
    {get(event, 'payload.commits', []).map(commit => (
      <Text key={commit.sha}>Сообщение: {commit.message}</Text>
    ))}
  </View>
);

const EventDetail = ({navigation, route, path, events}) => {
  const event = events.find(event => route.params.id === event.id);
  const created = event && parseDate(event.created_at);
  console.log('render EventDetail');
  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>Детали события</Text>
      <Text>
        Создан: {created && created.date} {created && created.time}
      </Text>
      <Text>Автор: {event && event.actor.login}</Text>
      <Text>Тип: {event && event.type}</Text>
      <Text>Репозиторий: {event && event.repo.name}</Text>
      {get(event, 'type', false) && event.type === 'PushEvent' && (
        <PushEvent event={event} />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  events: state.data,
});

export default connect(mapStateToProps)(EventDetail);
