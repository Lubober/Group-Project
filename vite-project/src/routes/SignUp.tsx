import NavBar from "../components/navbar";
// import EntryField from "../components/entryfield";
import { FormEvent, useState } from "react";
import "../styles/signup.css";
import "../styles/entryfield.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        surname: "",
        dob: "",
        postcode: "",
    });
    const uri = "http://localhost:8808/api/register/";
    const [termsDialogOpen, setTermsDialogOpen] = useState(false);
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
        upload(jsondata, uri); //send data to back-end later
    };

    async function upload(jsondata: string, uri: string) {
        try {
            await fetch(uri, {
                method: "POST",
                body: jsondata,
                mode: "cors",
                headers: { "Content-Type": "application/json" },
            }).then((response) => {
                if(response.ok){
                  setIsLoading(false);
                console.log(response);
                navigate("/login", { replace: true });
                }
                else{
                  navigate("/",{replace:true})
                }
            });
        } catch (error) {
            console.log("error" + error);
        }
    }

    return (
      <>
        <NavBar rightsignup={true} />

        <form
          action="/signup"
          method="get"
          className="sign-up-form"
          id="form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="form">
            <h1>Create an account</h1>
          </label>

          <div className="two-inputs-in-one-row">
            <div className="form-text-box">
              <label htmlFor="form-fn">Legal First Name</label>
              <input
                type="text"
                id="form-fn"
                required={true}
                name="first_name"
                defaultValue={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-text-box">
              <label htmlFor="form-ln">Legal Last Name</label>
              <input
                type="text"
                id={"form-ln"}
                required={true}
                name="surname"
                defaultValue={formData.surname}
                onChange={handleChange}
              />
            </div>
            {/* <EntryField formID="form-fn" requirethiselement={true} formname="Legal First Name"/> */}
            {/* <EntryField formID="form-ln" formname="Legal Last Name" requirethiselement={true}/> */}
          </div>
          <div className="two-inputs-in-one-row">
            {/* <EntryField formID="form-pc" requirethiselement={false} formname="Postcode"/>
            <EntryField formID="form-dob" requirethiselement={false} formname="Date Of Birth"/> */}
            <div className="form-text-box">
              <label htmlFor={"form-pc"}>Postcode</label>
              <input
                type="text"
                id={"form-pc"}
                name="postcode"
                defaultValue={formData.postcode}
                onChange={handleChange}
              />
            </div>
            <div className="form-text-box">
              <label htmlFor={"form-dob"}>Date of Birth</label>
              <input
                type="date"
                id={"form-dob"}
                name="dob"
                required={true}
                defaultValue={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-text-box">
            <label htmlFor="item-email">Email</label>
            <input
              type="email"
              id="item-email"
              required={true}
              name="email"
              defaultValue={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-text-box">
            <label htmlFor="item-pw">Password</label>
            <input
              type="password"
              id="item-pw"
              required={true}
              name="password"
              defaultValue={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-checkboxes">
            <label htmlFor="over18" className="over18">
              Are you over 18?
            </label>
            <input
              type="checkbox"
              required={true}
              id="over18"
              name="over18"
              //We don't need that data because the user has to check the boxes in order to continue
              // value={formData.over18}
              // onChange={handleChange}
            ></input>
            <label htmlFor="termsandcond">
              Do you accept the
              <span
                className="terms-link"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior (checkbox click)
                  setTermsDialogOpen(!termsDialogOpen); // Open/close dialog
                }}
              >
                {" "}
                terms and conditions
              </span>
              ?
            </label>
            <input
              type="checkbox"
              required={true}
              id="termsandcond"
              name="termsandcond"
            ></input>
          </div>

          {termsDialogOpen && (
            <div
              className="overlay"
              onClick={() => setTermsDialogOpen(false)}
            ></div>
          )}

          <dialog open={termsDialogOpen} id="terms-dialog">
            <h2>Terms and Conditions</h2>
            <p>
              By agreeing to this condition, you agree to the following terms in
              full:{" "}
            </p>
            <p>
              You provide accurate information when registering, to include that
              you are over the age of 18, and a UK citizen. Failure to do so may
              incriminate you.{" "}
            </p>
            <p>
              You must use this website lawfully and refrain from activities
              that may cause damage or harm.{" "}
            </p>
            <p>
              Understand that trading stocks involves risk, and you're solely
              responsible for your investment decisions. We are not responsible
              or liable for any losses incurred from your trading.
            </p>

            <button onClick={() => setTermsDialogOpen(false)}>Close</button>
          </dialog>

          <button className="btn-dark-purple" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create free account"}
          </button>
        </form>
      </>
    );
}

export default SignUp;
