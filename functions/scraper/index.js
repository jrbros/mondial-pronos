const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");

const MATCHES_URL = "https://www.fifa.com/worldcup/matches";

function getMatches() {
    fetch(MATCHES_URL)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const phases = {};
            $(".fi-mu-list").each((index, elem) => {
                const phase = $(elem);
                const title = phase
                    .find(".fi-mu-list__head")
                    .text()
                    .replace(/[\s\n\r]+/g, " ")
                    .trim();
                const matches = {};
                phase.children(".fi-mu").each((i, elem) => {
                    const match = $(elem);
                    const home = match.find(".home").data("team-id");
                    const away = match.find(".away").data("team-id");
                    matches[i] = {
                        id: match.data("id"),
                        date: match
                            .find(".fi-mu__info__datetime")
                            .data("utcdate"),
                        home: home,
                        away: away,
                        is_known: home && away,
                        is_finished: match.data("status") != 1,
                        result: {
                            winner: null,
                            home_team_score: null,
                            away_team_score: null
                        }
                    };
                });
                phases[index] = {
                    id: phase.data("matchesdate") || phase.data("idstage"),
                    title: phase.data("matchesdate")
                        ? `Group Phase: ${title}`
                        : title,
                    matches: matches
                };
            });
            console.log(JSON.stringify(phases));
        })
        .catch(err => console.error(err));
}

module.exports = getMatches;
