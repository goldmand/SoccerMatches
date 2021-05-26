var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");


router.get('/playerFullDetails/:playerId', async (req, res, next) => {
    try {
      const player_details = await players_utils.getPlayerById(
        req.params.playerId
      );
      
      res.send(player_details);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
  

