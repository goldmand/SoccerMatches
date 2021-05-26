var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const league_details = require("./utils/league_utils");
// const game_utils = require("./utils/game_utils");


router.post("/addGame", async (req, res, next) => {
  try {
      let game_date_time = req.body.game_date_time;
      if (game_date_time === undefined)
      {
          console.log("please check your input");
          throw { status: 409, message: "one or more values missing" };
      }
      let home_team_id = req.body.home_team_id;
      let guest_team_id = req.body.guest_team_id;
      let field = req.body.field;
    await DButils.execQuery(`INSERT INTO dbo.future_games (game_date_time,home_team_id,\
        guest_team_id,field) VALUES \
     (DATEADD(year, 0, '${game_date_time}')
     , ${home_team_id}, ${guest_team_id}, '${field}')`
    );
    res.status(201).send('game was created');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
