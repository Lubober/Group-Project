const uri = "http://localhost:8808/api/login/";
const data = {
    email: "a@gmail.com",
    password: "password",
};
const jsondata = JSON.stringify(data);
let res = "";

async function tryLogin(uri, jsondata) {
    let response = null;

    try {
        let rawResponse = await fetch(uri, {
            method: "POST",
            body: jsondata,
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        });
        response = await rawResponse.json();
    } catch (error) {
        console.log("error" + error);
    }

    return response;
}

async function upload(token) {
    try {
        fetch("http://localhost:8808/api/FTSE/", {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            console.log(response);
        });
    } catch (error) {
        console.log(error);
    }
}

tryLogin(uri, jsondata).then((x) => upload(x.token))