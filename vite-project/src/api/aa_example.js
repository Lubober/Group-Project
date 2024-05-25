const uri = "http://localhost:8808/api/register/";
const data = {
    email: "lubomir.zelinsky.a@gmail.com",
    password: "mypassword",
    first_name: "Lubomir",
    surname: "Zelinsky",
    dob: "2023-01-23",
    postcode: "CF234AD",
};
const jsondata = JSON.stringify(data);
console.log(jsondata);
async function upload(jsondata, uri) {
    try {
        await fetch(uri, {
            method: "POST",
            body: jsondata,
            mode: "cors", //convention, do this 
            headers: {"Content-Type": "application/json"}, //convention, do this
        }).then((response) => {
            console.log(response);
        });
    } catch (error) {
        console.log("error"+error);
    }
}
upload(jsondata, uri);