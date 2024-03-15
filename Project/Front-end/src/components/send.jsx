import {ethers} from "ethers"
import "./Send.css";
const Send = ()=>{   
    function send({ state }) {

        const send = async (event) => {
            event.preventDefault();
            const { contract } = state;
            const name = document.querySelector("#name").value;
            
            //const amount = document.querySelector("#amount").value;
            const amount = { value: ethers.utils.parseEther("0.001") };
            const message = document.querySelector("#message").value;
            const transaction = await contract.buyChai(name, amount,message);
            await transaction.wait();
            alert("Transaction is successul");
            window.location.reload();
        }
        return  (
            <div className="center">
             <h1>Transfer</h1>
              <form onSubmit={send}>
                <div className="inputbox">
                  <input type="text" required="required" id="name" />
                  <span>Name</span>
                </div>
                <div className="inputbox">
                  <input type="text" required="required" id="amount" />
                  <span>amount</span>
                </div>
                <div className="inputbox">
                  <input type="text" required="required" id="message" />
                  <span>Message</span>
                </div>
                <div className="inputbox">
                  <button type="submit" value="send"  disabled={!state.contract}/>
                </div>
              </form>
                
              </div>
            );
 }
}
export default Send;