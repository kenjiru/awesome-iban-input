/* eslint-disable react/jsx-indent-props */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FlashingInput from '../flashing-input/FlashingInput';
import IbanUtil from './IbanUtil';

class Iban extends Component {
    constructor(props) {
        super(props);

        const formattedIban = IbanUtil.formatIbanValue(props.value);

        this.state = {
            formattedIban,
            isValid: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                formattedIban: IbanUtil.formatIbanValue(nextProps.value),
            });
        }
    }

    handleChange = (ev) => {
        const formattedIban = ev.target.value;
        const isValid = IbanUtil.isValid(formattedIban);

        this.setState({
            isValid,
        });

        if (isValid) {
            this.setState({
                formattedIban,
            });

            const ibanValue = IbanUtil.getIbanValue(ev.target.value);
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
