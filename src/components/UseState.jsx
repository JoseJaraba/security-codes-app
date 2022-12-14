import React from 'react';

const SECURITY_CODE = 'paradigma';

const UseState = ({name}) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });

    const onConfirm = () => {
        setState({
            ...state,
            loading: !state.loading,
            confirmed: true,
        });
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: !state.loading
        });
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: !state.loading
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
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
                
                <button onClick={() => {
                    onCheck();
                }}
                >Approve</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Confirm the action. Do you want to delete the code?</p>
                <button
                    onClick={() =>{
                        onDelete();
                    }}
                >Yes, delete</button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >No, go back</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Successfully deleted</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >Reset</button>
            </React.Fragment>
        );
    }
    
};

export { UseState };