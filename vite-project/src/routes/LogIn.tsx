import { FormEvent, useState } from "react";
import NavBar from "../components/navbar";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const uri = "http://localhost:8808/api/login/";
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (evt: { target: { name: string; value: string } }) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((oldFormData) => {
            return { ...oldFormData, [changedField]: newValue };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        const jsondata = JSON.stringify(formData);
        console.log(jsondata);
        localStorage.setItem("login-credentials", jsondata);
        tryLogin( uri,jsondata).then((x)=>{localStorage.setItem('session-token',x.token)});
    };

    async function tryLogin(uri: string, jsondata: string) {
        let response = null;

        try { 
            const rawResponse = await fetch(uri, {
                method: "POST",
                body: jsondata,
                mode: "cors",
                headers: { "Content-Type": "application/json" },
            });
            response = await rawResponse.json();
            navigate("/");
            window.location.reload()
        } catch (error) {
            console.log("error" + error);
        }

        return response;
    }

    return (
        <>
            <NavBar rightsignup={true} />

            <form
                onSubmit={handleSubmit}
                method="get"
                action="/login"
                className="log-in-form"
                id="form"
            >
                <label htmlFor="form">
                    <h1>Log in</h1>
                </label>
                <div className="form-text-box form-text-box-login">
                    <label htmlFor="item-pw">Email*</label>
                    <input
                        required
                        onChange={handleChange}
                        name="email"
                        type="email"
                        id="item-pw"
                    />
                    <label htmlFor="item-pw">Password*</label>
                    <input
                        required
                        type="password"
                        name="password"
                        onChange={handleChange}
                        id="item-pw"
                    />
                </div>
                <button
                    disabled={isLoading}
                    className="btn-dark-purple btn-dark-purple-login"
                >
                    {isLoading ? "Loading..." : "Log in"}
                </button>
                <label htmlFor="Create-account">
                    Don't have an account?{" "}
                    <a href="/signup" className="login-sign-up-button">
                        Sign up
                    </a>
                </label>
            </form>
        </>
    );
}

export default Login;
