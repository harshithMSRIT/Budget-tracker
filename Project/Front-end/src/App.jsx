import { useState,useEffect } from 'react'
import abi from "./contractjson/Budget.json"
import {ethers} from "ethers"
import Send from './Components/Send'; 
import { Dept } from './Components/Dept';
import logo from './logo.jpg'
import './App.css'

function App() {
  const [state,setState]=useState({
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI=abi.abi;
      //Metamask part
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;

        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div >
    <img src={logo} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
     <Dept state={state}/>
      <Send state={state}/>
  </div>
  )
}

export default App
// contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3

