import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(({loading}) => (
  <Spinner visible={loading} />
));
