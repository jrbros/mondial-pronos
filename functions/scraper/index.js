const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");

const ROOT_URL = "https://www.fifa.com";
const MATCHES_URL = `${ROOT_URL}/worldcup/matches`;
const TEAMS_URL = `${ROOT_URL}/worldcup/teams`;

function getPhaseNameFromDom(dom) {
    if (dom.data("idstage")) {
        return dom
            .find(".fi-mu-list__head")
            .text()
            .replace(/[\s\n\r]+/g, " ")
            .trim();
    }
    return dom
        .find(".fi__info__group")
        .text()
        .replace(/[\s\n\r]+/g, " ")
        .trim();
}

function getMatchFromDom(dom, phase) {
    const match = {
        id: dom.data("id"),
        date: dom.find(".fi-mu__info__datetime").data("utcdate"),
        home: dom.find(".home").data("team-id"),
        away: dom.find(".away").data("team-id"),
        home_score: null,
        away_score: null,
        phase: phase
    };
    match.is_known = match.home && match.away;
    match.is_finished = match.home_score !== null && match.away_score !== null;
    return match;
}

function getTeamFromDom(dom) {
    return {
        id: /team\=(.*?)\/index/i.exec(dom.attr("href"))[1],
        name: dom
            .find(".team-name")
            .text()
            .replace(/[\s\n\r]+/g, " ")
            .trim(),
        info_url: `${ROOT_URL}${dom.attr("href")}`,
        flag_url: dom.find(".flag").attr("src")
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
                const phase = getPhaseNameFromDom(phaseDom);
                phaseDom.children(".fi-mu").each((__, matchElem) => {
                    const matchDom = $(matchElem);
                    const match = getMatchFromDom(matchDom, phase);
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
