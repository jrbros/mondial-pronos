const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");

const ROOT_URL = "https://www.fifa.com";
const MATCHES_URL = `${ROOT_URL}/worldcup/matches`;
const TEAMS_URL = `${ROOT_URL}/worldcup/teams`;

function getPhaseNameFromDom(matchDom, phaseDom) {
    if (phaseDom.data("idstage")) {
        return phaseDom
            .find(".fi-mu-list__head")
            .text()
            .replace(/[\s\n\r]+/g, " ")
            .trim();
    }
    return matchDom
        .find(".fi__info__group")
        .text()
        .replace(/[\s\n\r]+/g, " ")
        .trim();
}

function getMatchFromDom(matchDom, phaseDom) {
    const match = {
        id: matchDom.data("id"),
        date: matchDom.find(".fi-mu__info__datetime").data("utcdate"),
        home: matchDom.find(".home").data("team-id"),
        away: matchDom.find(".away").data("team-id"),
        home_score: null,
        away_score: null,
        phase: getPhaseNameFromDom(matchDom, phaseDom)
    };
    match.is_known = !!match.home && !!match.away;
    match.is_finished = match.home_score !== null && match.away_score !== null;
    return match;
}

function getTeamFromDom(teamDom) {
    return {
        id: /team\=(.*?)\/index/i.exec(teamDom.attr("href"))[1],
        name: teamDom
            .find(".team-name")
            .text()
            .replace(/[\s\n\r]+/g, " ")
            .trim(),
        info_url: `${ROOT_URL}${teamDom.attr("href")}`,
        flag_url: teamDom.find(".flag").attr("src")
    };
}

function getMatches() {
    fetch(MATCHES_URL)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const matches = {};

            $(".fi-mu-list").each((_, phaseElem) => {
                const phaseDom = $(phaseElem);
                phaseDom.children(".fi-mu").each((__, matchElem) => {
                    const matchDom = $(matchElem);
                    const match = getMatchFromDom(matchDom, phaseDom);
                    matches[match.id] = match;
                });
            });
            console.log(JSON.stringify(matches));
        })
        .catch(err => console.error(err));
}

function getTeams() {
    fetch(TEAMS_URL)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const teams = {};

            $(".team").each((_, teamElem) => {
                const teamDom = $(teamElem);
                const team = getTeamFromDom(teamDom);
                teams[team.id] = team;
            });
            console.log(JSON.stringify(teams));
        })
        .catch(err => console.error(err));
}

function scrapeFIFAWebsite() {
    getMatches();
    getTeams();
}

module.exports = scrapeFIFAWebsite;
