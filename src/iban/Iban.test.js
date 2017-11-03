import React from 'react';
import shallowToJson from 'enzyme-to-json';
import {shallow} from 'enzyme';

import FlashingInput from '../flashing-input/FlashingInput';

import Iban from './Iban';

export const IBAN_VALUE = 'AT000000';
export const IBAN_FORMATTED = 'AT00 0000';

export const IBAN_VALUE_2 = 'AT001111';
export const IBAN_FORMATTED_2 = 'AT00 1111';

export const IBAN_FORMATTED_INVALID = 'AT00 A000';

describe('Iban component', () => {
    let changeHandler;
    let output;

    beforeAll(() => {
        changeHandler = jest.fn();

        output = shallow(<Iban value={IBAN_VALUE} onChange={changeHandler} />);
    });

    it('validates the snapshot', () => {
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('calls the onChange prop when the input changes', () => {
        simulateChange(output);

        expect(changeHandler).toBeCalledWith(IBAN_VALUE_2);
    });

    it('updates the input when we receive a new value', () => {
        output.setProps({
            value: IBAN_VALUE_2,
        });

        expect(output.state().formattedIban).toEqual(IBAN_FORMATTED_2);
    });
});


function simulateChange(output) {
    const input = output.find(FlashingInput);

    input.simulate('change', IBAN_FORMATTED_2);
}