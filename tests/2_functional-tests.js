// -----[Keep the tests in the same order!]-----
// if additional are added, keep them at the very end!

const chaiHttp = require("chai-http"),
  server = require("../server"),
  chai = require("chai"),
  { assert } = chai;
chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("Routing Tests", () => {
    suite("GET /api/convert => conversion object", () => {
      test("Convert 10L (valid input)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, "L");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, "gal");
            done();
          });
      });

      test("Convert 32g (invalid input unit)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid unit");
            assert.equal(res.body.initNum, null);
            assert.equal(res.body.initUnit, null);
            assert.equal(res.body.returnUnit, null);
            done();
          });
      });

      test("Convert 3/7.2/4kg (invalid number)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/72/4kg" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number");
            assert.equal(res.body.initNum, null);
            assert.equal(res.body.initUnit, null);
            assert.equal(res.body.returnUnit, null);
            done();
          });
      });

      test("Convert 3/7.2/4kilomegagram (invalid number and unit)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number and unit");
            assert.equal(res.body.initNum, null);
            assert.equal(res.body.initUnit, null);
            assert.equal(res.body.returnUnit, null);
            done();
          });
      });

      test("Convert kg (no number)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "1KG" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "KG");
            assert.approximately(res.body.returnNum, 2.2046, 0.1);
            assert.equal(res.body.returnUnit, "lbs");
            done();
          });
      });
    });
  });
});
