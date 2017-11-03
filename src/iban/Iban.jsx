/* eslint-disable react/jsx-indent-props */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FlashingInput from '../flashing-input/FlashingInput';

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

    static isValid(ibanStr) {
        const firstTwoChars = ibanStr.substring(0, 2);
        const remainingChars = ibanStr.substring(2);

        return Iban.testFirstTwoChars(firstTwoChars) && Iban.testRemainingChars(remainingChars);
    }

    static testFirstTwoChars(firstTwoChars) {
        if (firstTwoChars.length === 0) {
            return true;
        }

        return /^[a-z A-Z]*$/.test(firstTwoChars);
    }

    static testRemainingChars(remainingChars) {
        if (remainingChars.length === 0) {
            return true;
        }

        return /^[0-9 ]*$/.test(remainingChars);
    }

    constructor(props) {
        super(props);

        const formattedIban = Iban.formatIbanValue(props.value);

        this.state = {
            formattedIban,
            isValid: true,
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
        const formattedIban = ev.target.value;
        const isValid = Iban.isValid(formattedIban);

        this.setState({
            isValid,
        });

        if (isValid) {
            this.setState({
                formattedIban,
            });

            const ibanValue = Iban.getIbanValue(ev.target.value);
            this.props.onChange(ibanValue);
        }
    };

    renderValidationWarning() {
        if (this.state.isValid) {
            return <span />;
        }

        return <span>Invalid</span>;
    }

    render() {
        return (
            <div className="iban">
                <FlashingInput
                    value={this.state.formattedIban}
                    onChange={this.handleChange}
                    isValid={this.state.isValid}
                />
                {this.renderValidationWarning()}
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
