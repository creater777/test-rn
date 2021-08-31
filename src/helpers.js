import {StyleSheet} from 'react-native';

export const parseDate = date => {
  date = new Date(date);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  row: {
    padding: 10,
  },
  error: {
    backgroundColor: '#eaa',
  },
});
