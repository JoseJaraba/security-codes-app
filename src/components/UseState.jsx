import React from 'react';

const UseState = ({name}) => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log('Starting effect...');
        
        if(!!loading) {
            setTimeout(() => {
                console.log('Working on validation');
    
                setLoading(!loading)
    
                console.log('Ending validation');
            },3000)
        }

        console.log('Ending effect...');
    }, [loading])

    return (
        <div>
            <h2>Delete {name}</h2>
            
            <p>Please, type the security code</p>

            {error && (
                <p>Error: The security code is invalid</p>
            )}

            {loading && (
                <p>Loading...</p>
            )}
            
            <input type="text" placeholder='Security code' />
            <button onClick={() => setLoading(!loading)}
            >Approve</button>
        </div>
    );
};

export { UseState };