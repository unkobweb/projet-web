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
  let mostDiscount = await Game.findOne({
    where: { tweetedDiscount: false },
    order: [["discount", "DESC"]],
  });
  mostDiscount.tweetedDiscount = true;
  await mostDiscount.save();

  let pochette = fs.readFileSync(
    "./public/alex/img/games/" + mostDiscount.slug + ".jpg"
  );

  client.post("media/upload", { media: pochette }, function (
    error,
    media,
    response
  ) {
    if (!error) {
      let status = {
        status:
          "🚨 ALERTE PRIX BAS 🚨\n" +
          mostDiscount.title +
          " a -" +
          mostDiscount.discount +
          "% !\nFoncez ! -> https://to-games-together.xyz/game/" +
          mostDiscount.id,
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
