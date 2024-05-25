import { useEffect } from "react";
import Routing from "./Routes";
import "./styles/ignoreme.css";

function App() {
    

    const session_token = localStorage.getItem("session-token");
    console.log(session_token);
    console.log(session_token != "undefined");

    const isloggedin = session_token != "undefined" && session_token != null;
    console.log(isloggedin);
    // IF YOU WANT TO IGNORE LOGIN STATUS, PASS THE FOLLOWING CONSTANT IN THE ROUTING ELEMENT
    // const teststatusloggedin = "";

    return <Routing isloggedin={isloggedin} />;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ bypass login status for test= pass "teststatusloggedin", for login function to be working, pass "isloggedin"
    // if some pages cannot be accessed, just switch between those parameters. play around with it until it works
}

export default App;
