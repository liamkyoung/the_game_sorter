import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const GAMES = process.env.REACT_APP_API_GATEWAY_GAMES_ENDPOINT;
const MULTI_ENDPOINT = process.env.REACT_APP_API_GATEWAY_MULTI_ENDPOINT;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const TOKEN_AUTH = process.env.REACT_APP_TOKEN_AUTH;

app.use(bodyParser.json());
app.use(cors());

app.post("/gameTitles", (req, res) => {
  const { query } = req.body;
  if (!query) return res.send({ status: 404, message: "Error: Empty body" });
  axios({
    url: `${GAMES}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${CLIENT_ID}`,
      Authorization: `Bearer ${TOKEN_AUTH}`,
      "Access-Control-Allow-Origin": "*",
    },
    data: query,
  })
    .then((r) => {
      return res.send({ status: 200, data: r.data });
    })
    .catch((e) => {
      console.log(e);
      return res.send({ status: 404, message: "Error fetching from IGDB API" });
    });
});

app.post("/similarGames", (req, res) => {
  const { query } = req.body;
  if (!query) return res.send({ status: 404, message: "Error: Empty body" });

  axios({
    url: `${MULTI_ENDPOINT}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${CLIENT_ID}`,
      Authorization: `Bearer ${TOKEN_AUTH}`,
      "Access-Control-Allow-Origin": "*",
    },
    data: query,
  })
    .then((r) => {
      return res.send({ status: 200, data: r.data });
    })
    .catch((e) => {
      console.log(e);
      return res.send({ status: 404, message: "Error fetching from IGDB API" });
    });
});

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
