/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const units = {
  gal: "L",
  L: "gal",
  lbs: "kg",
  kg: "lbs",
  km: "mi",
  mi: "km"
};

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

const valRegex = /([\d.\s]+)([A-z]+)/g;

function ConvertHandler() {
  this.getNum = function(input) {
    // store all regex matches
    const result = input.exec(valRegex);

    // manually reset the index
    valRegex.lastIndex = 0;

    // clear all the spaces
    result = result.split("");
    const array = [];
    result.forEach(char => {
      const value = char.trim();
      if (value) array.push(value);
    });

    result = array.join("");
    return result;

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

  this.getUnit = function(input) {
    let result = valRegex.exec(input)[2];
    valRegex.lastIndex = 0;

    switch (result.toLowerCase()) {
      case "gal":
      case "gallon":
        result = "gallon";
        break;
      case "kg":
      case "kilogram":
      case "kilogramme":
        result = "kilogramme";
        break;
      case "kilometer":
      case "kilometre":
      case "km":
        result = "kilometre";
        break;
      case "l":
      case "liter":
      case "liters":
        result = "liter";
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

  this.getReturnUnit = function(initUnit) {
    // rewrite as ternary operator?
    if (initUnit === null) return null;

    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    var result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const LToGal = 1 / galToL;
    const kgToLbs = 1 / lbsToKg;
    const kmToMi = 1 / miToKm;
    var result;

    if (initNum === null) return null;

    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum * LToGal;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum * kgToLbs;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum * kmToMi;
      default:
        return null;
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    validUnits.forEach(unit => {
      if (
        unit === initUnit.toLowerCase() ||
        `${unit}s` === initUnit.toLowerCase()
      ) {
      } else {
      }
    });
    //     // prev
    //     // rewrite as ternary operator
    //     if (
    //       initNum === null ||
    //       initUnit === null ||
    //       returnNum === null ||
    //       returnUnit === null
    //     )
    //       return null;

    //     return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;

// tolowercase the units
