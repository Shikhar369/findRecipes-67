// This file is used to store all the helper functions that are used throughout the application

import { TIMEOUT_SEC } from "./config";

export async function getJSON(url) {
    try {
        const res = await Promise.race([fetch(url), timeout(10)]);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} ${res.status}`);
        }

        return data;
    } catch(err) {
        throw err;
    }
}

function timeout(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${TIMEOUT_SEC} second`))
        }, s * 1000);
    });
};

export async function sendJSON(url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData),
        })

        const res = await Promise.race([fetchPro, timeout(10)]);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} ${res.status}`);
        }

        return data;
    } catch(err) {
        throw err;
    }
}