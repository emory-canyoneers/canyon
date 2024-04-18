const baseUrl = "http://joincanyon.org/";

export async function get_from(endpoint, token) {
    const url = baseUrl + endpoint;
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };

    const response = await fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                console.log("Bad token: " + token);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            return data;
        });
    
    return response;
}

export async function post_to(endpoint, token, body) {
    const url = baseUrl + endpoint;
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}\nResponse: ${response}`);
            }
            return response.json();
        }).then((data) => {
            return data;
        });
    
    return response;
}

export async function put_to(endpoint, token, body) {
    const url = baseUrl + endpoint;
    const options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}\nResponse: ${response}`);
            }
            return response.json();
        }).then((data) => {
            return data;
        });
    
    return response;
}