const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";


async function getPlayerById(player_id) {
  const player = await axios.get(`${api_domain}/players/${player_id}`, {
    params: {
      include: "team",
      api_token: process.env.api_token,
    },
  });
  full_name = player.data.data.fullname;
  picture = player.data.data.image_path;
  position = player.data.data.position_id;
  common_name = player.data.data.common_name;
  nationality = player.data.data.nationality;
  birthcountry = player.data.data.birthcountry;
  birthdate =  player.data.data.birthdate;
  height = player.data.data.height;
  weight = player.data.data.weight;
  team_name = player.data.data.team.data.name;
  return {
    fullname:full_name,
    commonName:common_name,
    nationality:nationality,
    birthdate:birthdate,
    birthCountry:birthdate,
    height:height,
    weight:weight,
    image:picture,
    position:position,
    team_name:team_name
  };
}



async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}

exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerById = getPlayerById;
