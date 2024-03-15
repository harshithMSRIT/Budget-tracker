import { useState,useEffect } from "react";
const Dept=({state})=>{
  try{
    const [dept,setdept]=useState([])
    const {contract}=state;
    useEffect(()=>{
        const deptMessage = async()=>{
          const dept = await contract.getdept();
          setdept(dept)
          
        }
        contract && deptMessage()
    },[contract])
  }
  catch(error){
    console.error("error fetching data from contract");
  }
  const Send = (event) => {
    event.preventDefault();
    // Code to handle form submission, e.g., sending data to the server
    console.log("Form submitted!")
  }
    return  (
        <div className="center">
         <h1>Send money to department</h1>
          <form onSubmit={Send}>
            <div className="inputbox">
              <input type="text" required="required" id="name" />
              <span>Name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="message" />
              <span>amount</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="message" />
              <span>Message</span>
            </div>
            <div className="inputbox">
              <input type="submit" value="send"  disabled={!state.contract}/>
            </div>
          </form>
            
          </div>
        );
  }

export { Dept };