import React from 'react';

const SECURITY_CODE = 'paradigma';

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET'
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        loading: !state.loading,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: !state.loading
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        error: false,
        loading: !state.loading
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true, 
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    }
    

});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state; 
    }
};

const UseReducer = ({name}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm})
    }

    const onError = () => {
        dispatch({type: actionTypes.error})
    }

    const onWrite = (newValue) => {
        dispatch({type: actionTypes.write, payload: newValue})
    }

    const onCheck = () => {
        dispatch({type: actionTypes.check})
    }

    const onDelete = () => {
        dispatch({type: actionTypes.delete})
    }

    const onReset = () => {
        dispatch({type: actionTypes.reset})
    }

    React.useEffect(() => {
        console.log('Starting effect...');
        
        if(!!state.loading) {
            setTimeout(() => {
                console.log('Working on validation');
                
                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
    
                console.log('Ending validation');
            },3000)
        }

        console.log('Ending effect...');
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
                
                <p>Please, type the security code</p>
    
                {state.error && (
                    <p>Error: The security code is invalid</p>
                )}
    
                {state.loading && (
                    <p>Loading...</p>
                )}
                
                <input 
                    type="text" 
                    placeholder='Security code'
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                
                <button onClick={onCheck}>Approve</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Confirm the action. Do you want to delete the code?</p>
                <button
                    onClick={onDelete}
                >Yes, delete</button>
                <button
                    onClick={onReset}
                >No, go back</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Successfully deleted</p>
                <button
                    onClick={onReset}
                >Reset</button>
            </React.Fragment>
        );
    }
    
};

export { UseReducer };