const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: !state.loading
    },
    'CHECK': {
        ...state,
        error: false,
        loading: !state.loading
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state; 
    }
};