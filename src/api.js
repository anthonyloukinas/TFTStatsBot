const axios = require('axios');

const consts = require('./utils/consts');

const apiUrls = {
    trackerGG: 'https://api.tracker.gg/api/v2/tft/standard'
};

const trackerGG = axios.create({ baseURL: apiUrls.trackerGG });

const getProfile = async (username, region) => {
    console.info(`trackerGG get profile : ${username} ${region}`);

    const res = await trackerGG.get(`/profile/riot/${encodeURI(username)}`, {
        params: {
            region: region.toUpperCase()
        }
    });

    return res.data;
};

const getSessions = async (username, region) => {
    console.log(`trackerGG get sessions : ${username} ${region}`);

    const res = await trackerGG.get(`/profile/riot/${encodeURI(username)}/sessions`, {
        params: {
            region: region.toUpperCase()
        }
    });

    console.log(res.data.data.items[0].matches[0].metadata.result.displayValue);
    return res.data;
};

module.exports = {
    getProfile,
    getSessions
};