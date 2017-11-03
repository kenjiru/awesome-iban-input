/* eslint-disable react/jsx-indent-props,no-param-reassign */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IbanUtil, {MAX_IBAN_LENGTH} from '../iban/IbanUtil';

class SmartInput extends Component {
    static TAB_CODE = 9;

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    handleKeyDown = (ev) => {
        if (ev.keyCode === SmartInput.TAB_CODE) {
            ev.preventDefault();

            if (this.props.value.length < MAX_IBAN_LENGTH) {
                const formattedIban = IbanUtil.padWithZeroes(this.props.value);

                this.props.onChange(formattedIban);
            }
        }
    };

    handleChange = (ev) => {
        this.props.onChange(ev.target.value);
    };

    render() {
        return (
            <input
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                value={this.props.value}
            />
        );
    }
}

export default SmartInput;
