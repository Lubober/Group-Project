import NavBar from "../components/navbar";
import "../styles/withdrawmoney.css";
import Footer from '../components/footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function WithdrawMoney(){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amountToAdd: 0,
    });
    // const [termsDialogOpen, setTermsDialogOpen] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);

    const handleChange = (evt: { target: { name: string; value: string } }) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((oldFormData) => {
            return { ...oldFormData, [changedField]: newValue };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        const uri = "http://localhost:8808/api/updateBalance/";
        e.preventDefault();
        formData.amountToAdd=formData.amountToAdd*-1
        const jsondata = JSON.stringify(formData);
        console.log(jsondata);
        localStorage.setItem("login-credentials", jsondata);
        upload(jsondata, uri); //send data to back-end later
    };

    async function upload(jsondata: string, uri: string) {
        try {
            fetch(uri, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "session-token"
                    )}`,
                },
                body: jsondata,
            }).then((res) => {
                console.log(res);
                navigate("/");
                window.location.reload()
            });
        } catch (e) {
            console.log(e);
        } 
        // try {
        //     await fetch(uri, {
        //         method: "POST",
        //         body: jsondata,
        //         mode: "cors",
        //         headers: { "Content-Type": "application/json" },
        //     }).then((response) => {
        //         setIsLoading(false);
        //         console.log(response);
        //         navigate("/login", { replace: true });
        //     });
        // } catch (error) {
        //     console.log("error" + error);
        // }
    }

    return (
        <>
            <NavBar rightsignup={false} />

            <div className="Add-Money-Page">
                <div className="header">
                    <h1>Withdraw Funds</h1>
                </div>

                <div className="content">
                    <div className="left-addmoney-content">
                        <p>
                            Amount to withdraw: <br></br>Name on Card:<br></br>Card
                            Number:<br></br>Expiry Date:<br></br>CCV:
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="right-addmoney-content">
                            <input
                                onChange={handleChange}
                                name="amountToAdd"
                                className="right-addmoney-content-amount"
                                type="number"
                                placeholder="Amount"
                                required
                            ></input>
                            <br></br>
                            <input
                                className="right-addmoney-content-name"
                                type="text"
                                placeholder="Name"
                                required
                            ></input>
                            <br></br>
                            <input
                                className="right-addmoney-content-card"
                                type="text"
                                placeholder="Card Number"
                                required
                            ></input>
                            <br></br>
                            <input
                                className="right-addmoney-content-date"
                                type="date"
                                placeholder="Expiry"
                                required
                            ></input>
                            <br></br>
                            <input
                                className="right-addmoney-content-CCV"
                                type="number"
                                placeholder="CCV"
                                required
                            ></input>
                            <br></br>
                        </div>

                        <div className="addmoney-button">
                            <button
                                type="submit"
                                className="btn-dark-purple btn-dark-purple-addmoney"
                            >
                                Withdraw Funds
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}


export default WithdrawMoney