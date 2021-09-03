import React from 'react';
import {Text, View} from 'react-native';
import {parseDate, styles} from '../helpers';

export default ({item, navigation}) => {
  const date = (item && parseDate(item.created_at)) || {};
  const onPressHandle = () => {
    navigation.push('EventDetail', {id: item.id});
  };
  console.log('item');
  return (
    <View style={styles.row}>
      <Text onPress={onPressHandle} replace={true}>
        <Text>
          {date.date} {date.time} {item.actor.login}
        </Text>
      </Text>
    </View>
  );
};
