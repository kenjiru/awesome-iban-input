export const MAX_IBAN_LENGTH = 24;
export const MAX_FORMATTED_IBAN_LENGTH = MAX_IBAN_LENGTH + 5;

export const GROUP_SIZE = 4;
export const FORMATTED_GROUP_SIZE = GROUP_SIZE + 1;

class IbanUtil {
    static isEndOfGroup(position) {
        return position % FORMATTED_GROUP_SIZE === 0;
    }

    static padWithZeroes(formattedIban) {
        let ibanValue = IbanUtil.getIbanValue(formattedIban);

        ibanValue = ibanValue.padEnd(MAX_IBAN_LENGTH, '0');

        return IbanUtil.formatIbanValue(ibanValue);
    }

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

        return ibanStr.length <= MAX_FORMATTED_IBAN_LENGTH &&
            IbanUtil.testFirstTwoChars(firstTwoChars) &&
            IbanUtil.testRemainingChars(remainingChars);
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
}

export default IbanUtil;
