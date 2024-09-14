import { useState } from "react";
import "./Consign.css"; 
import { useNavigate } from "react-router-dom";

function Consignment() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [phno, setPhno] = useState(""); 
    const [lno, setLno] = useState(""); 

    const handleConsignment = (e) => {
        e.preventDefault();
        window.alert("Submitted");
        navigate('/dashboard');
    }

    return (
       <>
           <div className="login-container">
                <h1>Register Driver</h1>
                <form onSubmit={handleConsignment}>
                    <div className="form-group">
                        <label>Driver's First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Firstname"
                        /> 
                    </div>
                    <div className="form-group">
                        <label>Driver's Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Lastname"
                        /> 
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        /> 
                    </div>
                    <div className="form-group">
                        <label>Driver's Phone Number</label>
                        <input
                            type="text"
                            value={phno}
                            onChange={(e) => setPhno(e.target.value)}
                            placeholder="Phone Number"
                        /> 
                    </div>
                    <div className="form-group">
                        <label>Driver's License Number</label>
                        <input
                            type="text"
                            value={lno}
                            onChange={(e) => setLno(e.target.value)}
                            placeholder="Driver's License Number"
                        /> 
                    </div>
                    <button type="submit" className="login-button">Submit</button>
                </form>
           </div>
       </>
    );
}

export default Consignment;
