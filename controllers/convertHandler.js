const regEx = /(^[\d/.\s]+)?([A-z]+)/;
let result;

function ConvertHandler() {
  this.getNum = input => {
    const unit = this.getUnit(input);

    if (unit === null) return null;

    !input.match(/\d/)
      ? // user story 11
        (result = "1")
      : // user story 9. index 1 = the value
        (result = input.match(regEx)[1] || "invalid number");

    const handleNumber = num => {
      if (num === "invalid number") return num;

      let fractions = [],
        multipleFractions = false;
      const integers = [];
      // split the expression
      num.split(" ").forEach(value => {
        // treat it as a fraction
        if (value.includes("/")) {
          // merge the array into the fractions array
          fractions = fractions.concat(value.split("/"));

          if (fractions.length > 2) multipleFractions = true;
        } // treat it as a whole and add it to the integer array
        else integers.push(value);
      });

      // more than one fraction = invalid number
      if (multipleFractions) return "invalid number";

      let decimal = 0.0,
        integer = 0;

      // handle fraction division
      if (fractions && fractions.length > 0)
        decimal = fractions.reduce((p, c) => parseFloat(p) / parseFloat(c));

      // handle integer addition
      if (integers && integers.length > 0)
        integer = integers.reduce((p, c) => parseFloat(p) + parseFloat(c));

      // add them together to get the final value
      return parseFloat(integer) + parseFloat(decimal);
    };
    return handleNumber(result);
  };

  this.getUnit = input => {
    if (!regEx.test(input)) return "invalid unit";

    // retrieve only the unit
    result = input.match(regEx)[2];

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
        return result === null ? null : "invalid unit";
    }
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

  // used for user story 12
  this.spellOutUnit = unit => {
    switch (unit.toLowerCase()) {
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
        return null;
    }
  };

  // user stories 5, 6 and 7
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
      // round the result to 5 decimals
      if (typeof result === "number") result = parseFloat(result.toFixed(5));
    }
    return result;
  };

  // user story 12
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    if (
      initNum === null ||
      initUnit === null ||
      returnNum === null ||
      returnUnit === null
    )
      return null;

    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
