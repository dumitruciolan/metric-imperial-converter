"use strict";

const { expect } = require("chai"),
  ConvertHandler = require("../controllers/convertHandler.js");

module.exports = app => {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let result;
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

    // if (initUnit === null && initNum === null)
    //   return res.status(200).send("invalid number and unit");
    if (typeof initNum !== "number" && returnUnit === "invalid unit")
      return res.status(200).send("invalid number and unit");

    //     else if (initNum === null) result = { error: "invalid number" };
    if (typeof initNum !== "number") {
      return res.status(200).send(initNum);
    }

    // else if (initUnit === null) result = { error: "invalid unit" };
    if (returnUnit === "invalid unit") {
      return res.status(200).send(returnUnit);
    } 
    
    // else result = { initNum, initUnit, returnNum, returnUnit, string: toString };
    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    });
  });
};
