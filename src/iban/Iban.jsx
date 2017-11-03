import React, {Component} from 'react';
import PropTypes from 'prop-types';

const GROUP_SIZE = 4;

class Iban extends Component {
    static formatIbanValue(ibanValue) {
        let formattedStr = '';
        const numGroups = ibanValue.length / GROUP_SIZE;

        for (let i = 0; i < numGroups; i += 1) {
            formattedStr += ibanValue.substring(i * GROUP_SIZE, (i + 1) * GROUP_SIZE);

            if (i < numGroups - 1) {
                formattedStr += ' ';
            }
        }

        return formattedStr;
    }

    static getIbanValue(ibanString) {
        return ibanString.replace(/\s*/g, '');
    }

    constructor(props) {
        super(props);

        this.state = {
            formattedIban: Iban.formatIbanValue(props.value),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                formattedIban: Iban.formatIbanValue(nextProps.value),
            });
        }
    }

    handleChange = (ev) => {
        this.setState({
            formattedIban: ev.target.value,
        });

        const ibanValue = Iban.getIbanValue(ev.target.value);
        this.props.onChange(ibanValue);
    };

    render() {
        return (
            <div className="iban">
                <input onChange={this.handleChange} value={this.state.formattedIban}/>
            </div>
        );
    }
}

Iban.defaultProps = {
    value: '',
};

Iban.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Iban;
