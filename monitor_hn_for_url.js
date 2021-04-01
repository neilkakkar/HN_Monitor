const fetch = require('node-fetch');

async function get_new_story_ids() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    const data = await response.json();
    return data;
}

async function get_data_for_id(id) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    const data = await response.json()
    return data || {}
}

function filter_data_by_url_domain(data, domain) {
    const url = data.url;
    if (!url) {
        return false;
    }
    const { hostname } = new URL(url);

    if (hostname === domain) {
        return true;
    }
    return false;
}

async function run(domain='neilkakkar.com') {
    const ids = await get_new_story_ids();

    for (const id of ids) {
        data = await get_data_for_id(id);
        if (filter_data_by_url_domain(data, domain)) {
            console.log("success!", data);
            return data.url;
        }
    }
}

run()

