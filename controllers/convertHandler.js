const validUnits = [
  "gal",
  "gallon",
  "kg",
  "kilo",
  "kilogram",
  "kilogramme",
  "kilometer",
  "kilometre",
  "km",
  "l",
  "lb",
  "liter",
  "litre",
  "mi",
  "mile",
  "pound"
];

// prev
const units = {
  gal: "L",
  L: "gal",
  lbs: "kg",
  kg: "lbs",
  km: "mi",
  mi: "km"
};

// Meant to be used with exec().
// First group (the value) is index 1 of the returned array.
// Second group (the unit) is index 2 of the returned array.
const valRegex = /(^[\d/.\s]+)?([A-z]+)/g;

function ConvertHandler() {
  this.getNum = input => {
    let result;

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

    //     // prev
    //     const unit = this.getUnit(input);

    //     if (unit === null) return null;

    //     const calc = input.split(unit)[0];

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

    // Get only the unit value only
    let result = valRegex.exec(input)[2];
    // Reset the index of the regex to prevent issues
    valRegex.lastIndex = 0;

    switch (result) {
      case "gal":
        result = "gal";
        break;
      case "GAL":
        result = "GAL";
        break;
      case "kg":
        result = "kg";
        break;
      case "KG":
        result = "KG";
        break;
      case "km":
        result = "km";
        break;
      case "KM":
        result = "KM";
        break;
      case "l":
        result = "l";
        break;
      case "L":
        result = "L";
        break;
      case "mi":
        result = "mi";
        break;
      case "MI":
        result = "MI";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "LBS":
        result = "LBS";
        break;
      default:
        result = "invalid unit";
        break;
    }

    return result;

    //     // prev
    //     const regEx = /[(gal)|L|(lbs)|(kg)|(km)|(mi)]$/;
    //     const result = input.match(regEx);
    //     return result === null ? null : result[0];
  };

  this.getReturnUnit = initUnit => {
    let result;

    switch (initUnit) {
      case "gal":
      case "GAL":
        result = "l";
        break;
      case "kg":
      case "KG":
        result = "lbs";
        break;
      case "km":
      case "KM":
        result = "mi";
        break;
      case "l":
      case "L":
        result = "gal";
        break;
      case "mi":
      case "MI":
        result = "km";
        break;
      case "lbs":
      case "LBS":
        result = "kg";
        break;
      default:
        result = "invalid unit";
        break;
    }

    return result;
    //     // prev
    //     // rewrite as ternary operator?
    //     if (initUnit === null) return null;

    //     return units[initUnit];
  };

  this.spellOutUnit = unit => {
    let result;

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "kg":
        result = "kilogrammes";
        break;
      case "km":
        result = "kilometres";
        break;
      case "l":
        result = "litres";
        break;
      case "mi":
        result = "miles";
        break;
      case "lbs":
        result = "pounds";
        break;
      default:
        break;
    }

    return result;
  };

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541,
      lbsToKg = 0.453592,
      miToKm = 1.60934,
      LToGal = 1 / galToL,
      kgToLbs = 1 / lbsToKg,
      kmToMi = 1 / miToKm;
    let result;

    // prev
    //     if (initNum === null) return null;

    const handleNumber = num => {
      let tooManyFractions = false;
      let fractions = [];
      const integers = [];

      num.split(" ").forEach(value => {
        if (value.includes("/")) {
          fractions = fractions.concat(value.split("/"));

          // more than one fraction
          if (fractions.length > 2) {
            tooManyFractions = true;
          }
        } else {
          integers.push(value);
        }
      });

      if (tooManyFractions) {
        return "invalid number";
      }

      const decimal = fractions.reduce((p, c) => parseFloat(p) / parseFloat(c));
      const integer = integers.reduce(
        (p, c) => parseInt(p, 10) / parseInt(c, 10)
      );

      return parseInt(integer, 10) + parseFloat(decimal);
    };

    const unitValue = handleNumber(initNum);

    if (initNum !== "invalid number") {
      switch (initNum) {
        case "gal":
        case "GAL":
          result = initNum * galToL;
          break;
        case "kg":
        case "KG":
          result = initNum / lbsToKg;
          break;
        case "km":
        case "KM":
          result = initNum / miToKm;
          break;
        case "l":
        case "L":
          result = initNum / galToL;
          break;
        case "mi":
        case "MI":
          result = initNum * miToKm;
          break;
        case "lbs":
        case "LBS":
          result = initNum * lbsToKg;
          break;
        default:
          // result = null;
          break;
      }

      if (typeof result === "number") {
        result = Number(result.toFixed(5));
      }
    }

    return result;

    // prev
    //             if (initNum === null) {
    //             return null;
    //         }

    //         switch (initUnit) {
    //             case 'gal': {
    //                 return initNum * galToL;
    //             }
    //             case 'L': {
    //                 return initNum * LToGal;
    //             }
    //             case 'lbs': {
    //                 return initNum * lbsToKg;
    //             }
    //             case 'kg': {
    //                 return initNum * kgToLbs;
    //             }
    //             case 'mi': {
    //                 return initNum * miToKm;
    //             }
    //             case 'km': {
    //                 return initNum * kmToMi;
    //             }
    //             default: {
    //                 return null;
    //             }
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    // TODO: Handle plural cases aka num > 1 = miles/kilogrammes etc.
    const result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
    //     // prev. rewrite as ternary operator?
    //     if (
    //       initNum === null ||
    //       initUnit === null ||
    //       returnNum === null ||
    //       returnUnit === null
    //     )
    //       return null;

    //     return result;
  };
}

module.exports = ConvertHandler;
