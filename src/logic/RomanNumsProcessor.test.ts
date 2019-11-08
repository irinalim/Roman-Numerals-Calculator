import {RomanNumsProcessor} from "./RomanNumsProcessor";

describe("logic", () => {
    const logic = new RomanNumsProcessor();
    it('convertNumberToRoman', () => {
        expect(logic.convertArabicToRoman(11)).toEqual("XI");
        expect(logic.convertArabicToRoman(1234)).toEqual("MCCXXXIV");
        expect(logic.convertArabicToRoman(0)).toEqual("");
        expect(logic.convertArabicToRoman(-1)).toEqual("");
    });
    it('convertRomanToArabic', () => {
        expect(logic.convertRomanToArabic("LXXXVI")).toEqual(86);
        expect(logic.convertRomanToArabic("MMMCDXXI")).toEqual(3421);
        expect(logic.convertRomanToArabic("IXIIV")).toEqual(0);
        expect(logic.convertRomanToArabic("")).toEqual(0);
    });
    it('isValidRoman', () => {
        expect(logic.isValidRoman("DCCLXV")).toEqual(true);
        expect(logic.isValidRoman("IXIIV")).toEqual(false);
        expect(logic.isValidRoman("")).toEqual(false);
    });
});
