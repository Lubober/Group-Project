import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import "../styles/account.css";
import "../styles/entryfield.css";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMMENTED OUT FOR VISUAL PURPOSES, FEEL FREE TO UNCOMMENT
// const password = "12345678";

// const x = {
//     user_id: 4,
//     first_name: "Lubomir",
//     last_name: "Zelinsky",
//     dob: "2003-11-20",
//     postcode: "CF234AD",
//     email: "lubomir.zelinsky.a@gmail.com",
//     balance: 0,
// };

function Account() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (evt: { target: { name: string; value: string } }) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((oldFormData) => {
            return { ...oldFormData, [changedField]: newValue };
        });
        console.log(formData);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const jsondata = JSON.stringify(formData);
        console.log(jsondata);
        setNewAccountInfo(jsondata);
    };

    const setNewAccountInfo = (jsondata: string) => {
        try {
            fetch("http://localhost:8808/api/updateAccountDetails/", {
                method: "POST",
                body: jsondata,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "session-token"
                    )}`,
                },
            }).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [newdata, setNewData] = useState({});
    const [finished, setFinished] = useState(false);
    const [userDetails, setUserDetails] = useState({
        id: -1,
        firstName: "Jack",
        lastName: "Kowalsky",
        dateofbirth: "05/02/2002",
        postCode: "CF244GB",
        email: "kowalskyj@cardiff.ac.uk",
        balance: 0,
    });

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("session-token");
        localStorage.removeItem("balance");
        localStorage.removeItem("login-credentials");
        localStorage.removeItem("tickers");
        navigate("/");
        window.location.reload();
    };

    async function getUserInfo() {
        const authstring = `Bearer ${localStorage.getItem("session-token")}`;
        try {
            await fetch("http://localhost:8808/api/getUserDetails/", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authstring,
                },
            })
                .then((res) => {
                    console.log(res);
                    return res.json();
                })
                .then((data) => {
                    console.log("THEDATA");
                    console.log(data);
                    setNewData(data);
                    setFinished(true);
                    reformat(data);
                    console.log("finished");
                });
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getUserInfo();
    }, []);

    const reformat = (data) => {
        if (data) {
            console.log(data);
            const reformattedData = {
                id: data.user_id,
                firstName: data.first_name,
                lastName: data.last_name,
                dateofbirth: new Date(data.dob).toLocaleDateString(),
                postCode: data.postcode,
                email: data.email,
                balance: data.balance,
            };
            console.log(reformattedData);
            setUserDetails(reformattedData);
        } else {
            window.setTimeout(reformat);
        }

        // const x = {
        //   user_id: 4,
        //   first_name: "Lubomir",
        //   last_name: "Zelinsky",
        //   dob: "2003-11-20",
        //   postcode: "CF234AD",
        //   email: "lubomir.zelinsky.a@gmail.com",
        //   balance: 0,
        // };
    };

    // console.log(getUserInfo())
    // const printUserInfo=()=>{
    //     if(finished){
    //         console.log(newdata)
    //     }
    //     else{
    //         window.setTimeout(printUserInfo,100)
    //     }
    // }
    // printUserInfo()

    return (
        <>
            <NavBar rightsignup={false} />

            <div className="Account-page">
                <div className="header">
                    <h1>Account information</h1>
                </div>
                <div className="content">
                    <div className="left-account-info">
                        <p>
                            Legal Name<br></br>Date of birth<br></br>Address
                            <br></br>Email
                        </p>
                    </div>
                    <div className="right-account-info">
                        <p>
                            {userDetails.firstName + " " + userDetails.lastName}
                            <br></br>
                            {userDetails.dateofbirth}
                            <br></br>
                            {userDetails.postCode}
                            <br></br>
                            {userDetails.email}
                        </p>
                    </div>
                </div>
                <form>
                    <div className="update-content">
                        <div className="left-update-info">
                            <p>
                                Update Legal Name<br></br>Update Surname
                                <br></br>Update Address<br></br>Update Email
                                <br></br>Update Password<br></br>
                                Confirm Password
                            </p>
                        </div>

                        <form
                            className="right-update-info"
                            onSubmit={handleSubmit}
                        >
                            <input
                                onChange={handleChange}
                                name="firstName"
                                type="text"
                                placeholder="Update Legal Name"
                            ></input>
                            <br></br>
                            <input
                                onChange={handleChange}
                                name="lastName"
                                type="text"
                                placeholder="Update Surname" //CHANGE TO DOB
                            ></input>
                            <br></br>
                            {/* <input
                                type="text"
                                placeholder="Update Address"
                                required
                            ></input> */}
                            <br></br>
                            <input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                placeholder="Update Email"
                            ></input>
                            <br></br>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="New password"
                                required
                            ></input>
                            <br></br>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                required
                            ></input>
                            <br></br>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="btn-dark-purple btn-dark-purple-accounts"
                            >
                                Update Details
                            </button>
                        </form>
                    </div>

                    <div className="functional_btns">
                        <Link to="/add-money">
                            <button className="btn-dark-purple btn-dark-purple-accounts">
                                Add Money
                            </button>
                        </Link>
                        <Link to="/withdraw-money">
                            <button className="btn-dark-purple btn-dark-purple-accounts">
                                Withdraw Money
                            </button>
                        </Link>
                    </div>
                </form>

                <div className="password-content"></div>
                <div className="logout">
                    <button onClick={logout} className="btn-dark-purple">
                        {" "}
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Account;
