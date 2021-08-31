import React from 'react';
import {Text, View} from 'react-native';
import {parseDate, styles} from '../helpers';

export default ({item, navigation}) => {
  // const navigation = useNavigation()
  const date = (item && parseDate(item.created_at)) || {};
  return (
    <View style={styles.row}>
      <Text
        onPress={() => {
          navigation.navigate('EventDetail', {id: item.id});
        }}
        replace={true}>
        <Text>
          {date.date} {date.time} {item.actor.login}
        </Text>
      </Text>
    </View>
  );
};
