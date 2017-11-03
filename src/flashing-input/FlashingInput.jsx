/* eslint-disable react/jsx-indent-props */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './FlashingInput.scss';

class FlashingInput extends Component {
    static ANIMATION_DURATION = 200;

    constructor(props) {
        super(props);

        this.state = {
            isFlashing: false,
        };
    }

    componentDidMount() {
        if (this.props.isValid === false) {
            this.triggerAnimation();
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.isValid !== nextProps.isValid || this.state.isFlashing === false) &&
            nextProps.isValid === false) {
            this.triggerAnimation();
        }
    }

    getClassName() {
        return className('flashing-input', {
            'is-flashing': this.state.isFlashing,
        });
    }

    triggerAnimation() {
        this.setState({
            isFlashing: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    isFlashing: false,
                });
            }, FlashingInput.ANIMATION_DURATION);
        });
    }

    render() {
        return (
            <input
                className={this.getClassName()}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}

FlashingInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
};

export default FlashingInput;
