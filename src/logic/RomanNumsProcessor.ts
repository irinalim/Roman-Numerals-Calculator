const romans: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

const arabicToRoman = new Map([
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
]);

export class RomanNumsProcessor {

    isValidRoman = (str: string) => {
        if (!str) {
            return false
        }
        return (/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/).test(str);
    };

    convertRomanToArabic = (roman: string) => {
        if (!roman || !this.isValidRoman(roman)) {
            return 0;
        }

        let num = this.letterToInt(roman.charAt(0));
        let previous, current;

        for (let i = 1; i < roman.length; i++) {
            current = this.letterToInt(roman.charAt(i));
            previous = this.letterToInt(roman.charAt(i - 1));
            if (current <= previous) {
                num += current;
            } else {
                num = num - previous * 2 + current;
            }
        }

        return num;
    };

    protected letterToInt = (letter: string) => {
        return romans[letter]
    };


    convertArabicToRoman = (num: number) => {
        if (num <= 0) {
            return "";
        }
        let ans = "";
        const keys = Array.from(arabicToRoman.keys());

        for (let i = 0; i < keys.length; i++) {
            const arabicNum = keys[i];
            const romanNum = arabicToRoman.get(arabicNum);
            if (num >= arabicNum) {
                ans += romanNum;
                num -= arabicNum;
                i--;
            }
        }
        return ans;
    };
}

