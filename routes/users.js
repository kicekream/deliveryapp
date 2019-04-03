const express = require("express");
const router = express.Router();


const {pool} = require('../models/user');

  router.get("/:userId/parcels", (req, res) => {
    const {userId} = req.params;
    pool.query('SELECT * FROM parcelInfo WHERE userId = $1', [userId], (error, result)=> {
      if(error) return res.status(400).send('User does not exit')
    res.send(result.rows)
    })
  });
  
module.exports = router;
      /* router.get("/:user/parcels", (req, res) => {
        const findUser = parcels.filter(s => s.user === req.params.user);
        if (!findUser)
          res.status(404).send("User with specified username not found");
        res.send(findUser);
      }); */
