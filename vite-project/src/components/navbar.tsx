import { useEffect, useState } from "react";
import "../styles/navbar.css";

interface NavElements {
    rightsignup: boolean;
}



function NavBar({rightsignup}:NavElements) {
    useEffect(() => {
        // BALANCE
        getBalance()
    }, []);

    const [balance,setBalance] = useState(-1)

    async function getBalance(){
        try {
            const authstring = `Bearer ${localStorage.getItem(
                "session-token"
            )}`;
            await fetch("http://localhost:8808/api/balance/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authstring,
                },
            })
                .then((response) => {
                    console.log("BALANCE")
                    return response.json();
                })
                .then((data)=>{
                    
                    localStorage.setItem("balance",data.balance)
                    setBalance(data.balance)
                    console.log(data.balance)
                })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="navbar">
            <a href="/">
                <div className="nav-el nav-logo">
                <p className="logo-cardiff logo-el">Cardiff</p>
                <p className="logo-exchange logo-el">Exchange</p>
            </div>
            </a>
            
                {rightsignup ? (
                    <div className="right-nav-el-group nav-el">
                        <a href="/" className="home-secondary">Home</a>
                        <a className="nav-el pink-button dark-text" href="/login">
                            Log in
                        </a>
                    </div>
                ) : (
                    <div className="right-nav-el-group nav-el">
                        
                    <a className="nav-el pink-button" href="/">
                        Home
                    </a>
                        <a href="/account" className="account-link"><i className="fa-solid fa-user"></i><p>{localStorage.getItem("balance")?localStorage.getItem("balance"):balance}&pound;</p></a>
                    
                    
                    </div>
                )}
        </div>
    );
}

export default NavBar;
