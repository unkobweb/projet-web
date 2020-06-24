const Twitter = require("twitter");
const Game = require("./models/").Game;
const fs = require("fs");
require("dotenv").config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

async function tweetAGame() {
  let mostLate = await Game.findOne({
    where: { tweetedLate: false },
    order: [["id", "DESC"]],
  });
  mostLate.tweetedLate = true;
  await mostLate.save();

  let pochette = fs.readFileSync(
    "./public/alex/img/games/" + mostLate.slug + ".jpg"
  );

  client.post("media/upload", { media: pochette }, function (
    error,
    media,
    response
  ) {
    if (!error) {
      let status = {
        status:
          "✌️ NOUVEAU JEU !\n" +
          mostLate.title +
          " a " +
          (mostLate.price - mostLate.price * (mostLate.discount / 100)).toFixed(
            2
          ) +
          "€ !\nC'est par ici ! -> https://to-games-together.xyz/game/" +
          mostLate.id,
        media_ids: media.media_id_string,
      };

      client.post("statuses/update", status, function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
        } else {
          console.log(error);
        }
      });
    } else {
      console.log(error);
    }
  });
}

tweetAGame();
