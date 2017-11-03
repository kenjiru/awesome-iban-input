import React from 'react';
import shallowToJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Iban from './Iban';

describe('Iban component', () => {
    it('should validate snapshot', () => {
        const changeHandler = jest.fn();

        const output = shallow(<Iban value="AT1231212312" onChange={changeHandler}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should use the correct transformation methods', () => {
        const ibanValue = 'AT1234567890';
        const ibanStr = 'AT12 3456 7890';

        expect(Iban.formatIbanValue(ibanValue)).toEqual(ibanStr);
        expect(Iban.getIbanValue(ibanStr)).toEqual(ibanValue);
    });

    it('should call the onChange prop when the input changes', () => {
        const initialIbanValue = 'AT1234567890';
        const changedIbanStr = 'AT12 3456 1234';
        const changedIbanValue = 'AT1234561234';

        const changeHandler = jest.fn();

        const output = shallow(<Iban value={initialIbanValue} onChange={changeHandler}/>);

        const input = output.find('input');

        expect(input).toBeDefined();

        input.simulate('change', {
            target: {
                value: changedIbanStr,
            },
        });

        expect(changeHandler).toBeCalledWith(changedIbanValue);
    });

    it('shoudl update the input when we receive a new value', () => {
        const initialIbanValue = 'AT1234567890';
        const changedIbanValue = 'AT1234561234';
        const changedIbanStr = 'AT12 3456 1234';

        const changeHandler = jest.fn();

        const output = shallow(<Iban value={initialIbanValue} onChange={changeHandler}/>);

        output.setProps({
            value: changedIbanValue,
        });

        expect(output.state().formattedIban).toEqual(changedIbanStr);
    });
});
