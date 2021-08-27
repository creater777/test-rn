import React from 'react';

const noop = () => {}

export default React.createContext({
    error: null,
    loading: false,
    events: null,
    page: 1,
    setPage: noop,
    update: noop
});
