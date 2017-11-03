/* eslint-disable react/jsx-indent-props,no-param-reassign */
import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IbanUtil, {MAX_FORMATTED_IBAN_LENGTH} from '../iban/IbanUtil';

const NO_PADDING = -1;

class SmartInput extends Component {
    static DELETE_CODE = 8;
    static TAB_CODE = 9;

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    static defaultProps = {
        className: '',
    };

    static removeCharAtPosition(str, position) {
        return str.slice(0, position) + str.slice(position + 1);
    }

    constructor(...args) {
        super(...args);

        this.paddingStart = NO_PADDING;
    }

    getClassName() {
        return classNames('smart-input', this.props.className);
    }

    updatePaddingStart() {
        const {length} = this.props.value;

        this.paddingStart = length;

        if (IbanUtil.isEndOfGroup(length + 1)) {
            this.paddingStart += 1;
        }
    }

    padWithZeroes() {
        const formattedIban = IbanUtil.padWithZeroes(this.props.value);

        this.props.onChange(formattedIban);
    }

    handleKeyDown = (ev) => {
        if (ev.keyCode === SmartInput.TAB_CODE) {
            ev.preventDefault();

            if (this.props.value.length < MAX_FORMATTED_IBAN_LENGTH) {
                this.updatePaddingStart();
                this.padWithZeroes();
            }
        }

        if (ev.keyCode === SmartInput.DELETE_CODE) {
            this.paddingStart = NO_PADDING;
        }
    };

    handleChange = (ev) => {
        const {paddingStart} = this;
        let {value} = ev.target;

        if (paddingStart > NO_PADDING && value[paddingStart] === '0' && value.length > this.props.value.length) {
            value = SmartInput.removeCharAtPosition(value, paddingStart);
        }

        this.props.onChange(value);
    };

    render() {
        return (
            <input
                size={36}
                className={this.getClassName()}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                value={this.props.value}
            />
        );
    }
}

export default SmartInput;
