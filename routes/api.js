"use strict";

const { expect } = require("chai"),
  ConvertHandler = require("../controllers/convertHandler.js");

module.exports = app => {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query,
      initNum = convertHandler.getNum(input),
      initUnit = convertHandler.getUnit(input),
      returnNum = convertHandler.convert(initNum, initUnit),
      returnUnit = convertHandler.getReturnUnit(initUnit),
      toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

    if (typeof initNum !== "number" && returnUnit === "invalid unit") {
      return res.status(400).send("invalid number and unit");
    }

    if (typeof initNum !== "number") {
      return res.status(400).send(initNum);
    }

    if (returnUnit === "invalid unit") {
      return res.status(400).send(returnUnit);
    }

    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    });

    // pre
    //     let result;

    //     if (initUnit === null && initNum === null)
    //       result = { erorr: "invalid number and unit" };
    //     else if (initUnit === null) result = { error: "invalid unit" };
    //     else if (initNum === null) result = { error: "invalid number" };
    //     else {
    //       result = { initNum, initUnit, returnNum, returnUnit, toString };
    //     }

    //     res.status(200).json(result);
  });
};
