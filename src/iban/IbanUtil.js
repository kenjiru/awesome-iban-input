const GROUP_SIZE = 4;

class IbanUtil {
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

        return IbanUtil.testFirstTwoChars(firstTwoChars) &&
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
