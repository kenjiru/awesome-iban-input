import React, {Component} from 'react';
import Iban from '../iban/Iban';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ibanValue: '',
        };
    }

    handleIbanChange = (ibanValue) => {
        this.setState({
            ibanValue,
        });
    };

    render() {
        return (
            <div className="App">
                <p>Please enter the IBAN number:</p>
                <Iban value={this.state.ibanValue} onChange={this.handleIbanChange} />

                <p>Iban value: {this.state.ibanValue}</p>
            </div>
        );
    }
}

export default App;
