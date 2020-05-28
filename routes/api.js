"use strict";

const { expect } = require("chai"),
  ConvertHandler = require("../controllers/convertHandler.js"),
  convertHandler = new ConvertHandler();

// user story 3
module.exports = app => {
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

    // handling invalid numbers and units (user story 10)
    if (typeof initNum !== "number" && returnUnit === "invalid unit")
      return res.status(200).send("invalid number and unit");
    // handling invalid numbers (user story 9)
    else if (typeof initNum !== "number") return res.status(200).send(initNum);
    // handling invalid units (user story 8)
    else if (initUnit === null || returnUnit === "invalid unit")
      return res.status(200).send(returnUnit);
    else
      res.status(200).json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString
      });
  });
};
