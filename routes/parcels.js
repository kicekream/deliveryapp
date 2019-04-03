const express = require("express");

const {pool, validateParcelInfo} = require('../models/parcel');
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/", (req, res) => {
  pool.query("SELECT * FROM parcelInfo ORDER BY id ASC", (error, result) => {
    if (error) console.log(error);
    res.send(result.rows);
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM parcelInfo WHERE id = $1",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else if (result.rows.length === 0) {
        return res.status(404).send("Parcel with specified id not found not found");
      } else {
        res.send(result.rows);
      }
    }
  );
});

router.post("/", auth, (req, res) => {
  const { error } = validateParcelInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { parcelName, status, presentLocation, destination, userID } = req.body;
  pool.query(
    "INSERT INTO parcelInfo (parcelname, status, presentlocation, destination, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [parcelName, status, presentLocation, destination, userID],
    (error, results) => {
      if (error) {
        console.log(error), res.send(error.detail);
      }
      res.send(`Parcel Created successfully with id ${results.rows[0].id}`);
    }
  );
});

router.put("/:id/cancel",auth, (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  pool.query(
    "UPDATE parcelInfo SET status = $1 WHERE id = $2",
    ["Cancelled", id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else if (result.rows.length === 0) {
        return res.status(404).send("Parcel with specified id not found");
      } else {
        res.send(result.rows);
      }
    }
  );
});

router.put('/:id/status', (req, res) => {

})
module.exports = router;
