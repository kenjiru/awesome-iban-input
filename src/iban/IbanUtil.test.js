import IbanUtil from './IbanUtil';
import {IBAN_VALUE, IBAN_FORMATTED, IBAN_FORMATTED_INVALID} from './Iban.test';

describe('IbanUtil', () => {
    it('formats correctly the IBAN value', () => {
        expect(IbanUtil.formatIbanValue(IBAN_VALUE)).toEqual(IBAN_FORMATTED);
    });

    it('converts the formatted IBAN to the corresponding value', () => {
        expect(IbanUtil.getIbanValue(IBAN_FORMATTED)).toEqual(IBAN_VALUE);
    });

    it('validates an empty string', () => {
        expect(IbanUtil.isValid('')).toBe(true);
    });

    it('validates a valid partial IBAN', () => {
        expect(IbanUtil.isValid(IBAN_FORMATTED)).toBe(true);
    });

    it('detects an invalid partial IBAN', () => {
        expect(IbanUtil.isValid(IBAN_FORMATTED_INVALID)).toBe(false);
    });
});
