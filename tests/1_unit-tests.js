// -----[Keep the tests in the same order!]----
// if additional are added, keep them at the very end!

const chai = require("chai"),
  ConvertHandler = require("../controllers/convertHandler.js"),
  convertHandler = new ConvertHandler(),
  { assert } = chai;

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", done => {
      const input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", done => {
      const input = "12.5KG";
      assert.equal(convertHandler.getNum(input), 12.5);
      done();
    });

    test("Fractional Input", done => {
      const input = "1/2KM";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input w/ Decimal", done => {
      const input = "1/2 0.25L";
      assert.equal(convertHandler.getNum(input), 0.75);
      done();
    });

    test("Invalid Input (double fraction)", done => {
      const input = "1/2 1/4KG";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("No Numerical Input", done => {
      const input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(ele => {
        assert.equal(convertHandler.getUnit(ele), ele);
      });
      done();
    });

    test("Unknown Unit Input", done => {
      const input = "2MG";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = ["gal", "kg", "km", "l", "mi", "lbs"];
      const expect = [
        "gallons",
        "kilogrammes",
        "kilometres",

        "liters",
        "miles",
        "pounds"
      ];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", done => {
      const input = [5, "gal"];
      const expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });

    test("L to Gal", done => {
      const input = [1, "l"];
      const expected = 0.2641;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });

    test("Mi to Km", done => {
      const input = [100, "mi"];
      const expected = 160.934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });

    test("Km to Mi", done => {
      const input = [10, "km"];
      const expected = 6.2137;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });

    test("Lbs to Kg", done => {
      const input = [20, "lbs"];
      const expected = 9.0718;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });

    test("Kg to Lbs", done => {
      const input = [5, "kg"];
      const expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); // 0.1 tolerance
      done();
    });
  });
});
