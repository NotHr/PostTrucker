import { useState } from "react"
import "./Consign.css" 
function Consignment(){
    const [weight, setWeight] = useState(0) 
    const [size, setSize] = useState("") 

    const handleConsignment = (e) => {}
    return(
       <>
           <div className="login-container">
                <h1>Consignment Register</h1>
                <form onSubmit={handleConsignment}>
                <div className="form-group">
                    <label>Consignment Weight</label>
                        <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter the weight of the Consignment"
                    />    
                </div>
                <div className="form-group">
                <label>Consignment Size</label>
                    <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Enter the Size of the Consignment"
                /> 
                </div>
               
                <div className="form-group">
                <label>Enter the priority</label>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </select>
                </div>
               
                <div className="form-group">
                <label>Enter From location</label>
                <select>
                    <option value="1">Hyderabad</option>
                    <option value="2">Siddipet</option>
                    <option value="3">Warangal</option>
                    <option value="4">Sangareddy</option>
                    <option value="5">Karimnagar</option>

                </select>
                </div>

                
                <div className="form-group">
                <label>Enter to Location</label>
                <select>
                <option value="1">Hyderabad</option>
                    <option value="2">Siddipet</option>
                    <option value="3">Warangal</option>
                    <option value="4">Sangareddy</option>
                    <option value="5">Karimnagar</option>

                </select>
                </div>

               
                <button type="submit" className="login-button"> Submit </button>

                </form>
           </div>
       
       </>
    )
}

export default Consignment