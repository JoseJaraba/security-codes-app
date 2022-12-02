import React from "react";
import { Loading } from "./Loading.jsx";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }
    
    // UNSAFE_componentWillMount() {
    //     console.log("UNSAFE_componentWillMount");
    // }
    
    // componentDidMount() {
    //     console.log("componentDidMount");
    // }
    
    componentDidUpdate() {
        console.log("Update");
        
        if(!!this.state.loading) {
            setTimeout(() => {
                console.log("Doing the validation");
                
                if(this.state.value === SECURITY_CODE) {
                    this.setState( { loading: false } );
                } else {
                    this.setState( { error: true, loading: false } );
                }
                
                console.log("Finishing the validation");
            }, 3000);
        }
    }
    
    render() {
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                
                <p>Please enter the security code</p>
                
                {this.state.error && (
                    <p>Error: Security code is incorrect</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}
                
                <input 
                    placeholder="Security Code"
                    value={this.state.value}
                    onChange={(event) => this.setState({value: event.target.value })} 
                />
                
                <button
                onClick={() => this.setState({ error: false, loading: true })}
                >Check</button>
            </div>
        );  
    }
}

export {ClassState};