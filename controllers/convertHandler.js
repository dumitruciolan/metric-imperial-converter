// Meant to be used with exec().
// First group (the value) is index 1 of the returned array.
// Second group (the unit) is index 2 of the returned array.
const valRegex = /(^[\d/.\s]+)?([A-z]+)/;
const regEx = /[(gal)|L|(lbs)|(kg)|(km)|(mi)]$/;
let result;

function ConvertHandler() {
  this.getNum = input => {
    const unit = this.getUnit(input);

    if (unit === null) return null;

    const calc = input.split(unit)[0];

    if (!input.match(/\d/)) {
      result = "1";
    } else {
      result = valRegex.exec(input)[1] || "invalid number";
      result = result.trim();
      // Reset the index of the regex to prevent issues.
      valRegex.lastIndex = 0;
    }

    const handleNumber = num => {
      if (num === "invalid number") {
        return num;
      }
      let tooManyFractions = false;
      let fractions = [];
      const integers = [];
      // Split the expression by any spaces.
      num.split(" ").forEach(value => {
        // If the value contains a forward slash, treat it as a fraction.
        if (value.includes("/")) {
          // Merge the split() returned array into the fractions array.
          fractions = fractions.concat(value.split("/"));

          // If there is more than one fraction, return invalid number.
          if (fractions.length > 2) {
            tooManyFractions = true;
          }
        } else {
          // Else treat it as a whole integer and add it to the integer array.
          integers.push(value);
        }
      });

      if (tooManyFractions) {
        return "invalid number";
      }

      let decimal = 0.0;
      let integer = 0;

      // Handle the fraction division.
      if (fractions && fractions.length > 0) {
        decimal = fractions.reduce((p, c) => parseFloat(p) / parseFloat(c));
      }

      // Handle the integer addition.
      if (integers && integers.length > 0) {
        integer = integers.reduce((p, c) => parseFloat(p) + parseFloat(c));
      }

      // Add it all together to get the final value.
      return parseFloat(integer) + parseFloat(decimal);
    };

    const unitValue = handleNumber(result);

    return unitValue;

    //     try {
    //       const result = eval(calc === "" ? 1 : calc);

    //       return result;
    //     } catch (e) {
    //       return null;
    //     }
  };

  this.getUnit = input => {
    if (!valRegex.test(input)) {
      return "invalid unit";
    }
    // Get the unit value only, which is at index 2.
    result = valRegex.exec(input)[2];
    // result = input.match(regEx)[0];

    // Reset the index of the regex to prevent issues.
    valRegex.lastIndex = 0;

    switch (result) {
      case "gal":
        return "gal";
      case "GAL":
        return "GAL";
      case "kg":
        return "kg";
      case "KG":
        return "KG";
      case "km":
        return "km";
      case "KM":
        return "KM";
      case "l":
        return "l";
      case "L":
        return "L";
      case "mi":
        return "mi";
      case "MI":
        return "MI";
      case "lbs":
        return "lbs";
      case "LBS":
        return "LBS";
      default:
        return "invalid unit";
    }
    // return result === null ? null : result[0];
  };

  this.getReturnUnit = initUnit => {
    if (initUnit === null) return null;

    switch (initUnit.toLowerCase()) {
      case "gal":
        return "l";
      case "kg":
        return "lbs";
      case "km":
        return "mi";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "lbs":
        return "kg";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = unit => {
    switch (unit) {
      case "gal":
        return "gallons";
      case "kg":
        return "kilogrammes";
      case "km":
        return "kilometres";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "lbs":
        return "pounds";
      default:
        return;
    }
  };

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (initNum === null) return null;

    if (initNum !== "invalid number") {
      switch (initUnit.toLowerCase()) {
        case "gal":
          result = initNum * galToL;
          break;
        case "kg":
          result = initNum / lbsToKg;
          break;
        case "km":
          result = initNum / miToKm;
          break;
        case "l":
          result = initNum / galToL;
          break;
        case "mi":
          result = initNum * miToKm;
          break;
        case "lbs":
          result = initNum * lbsToKg;
          break;
        default:
          result = null;
          break;
      }

      if (typeof result === "number") {
        result = Number(result.toFixed(5));
      }
    }

    return result;
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    initNum === null ||
    initUnit === null ||
    returnNum === null ||
    returnUnit === null
      ? null
      : result;

    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
