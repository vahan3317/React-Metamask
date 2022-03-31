import { useState } from "react";
import classes from "./Login.module.css";
import Card from '../UI/Card/Card';

const Login = (props) =>{
 const [isConnecting,setIsConnecting] = useState(false);

 const detectProvider = () =>{
let provider;
if(window.ethereum){
 provider = window.ethereum;
}else if(window.web3){
 provider = window.web3.currentProvider;
}else{
 window.alert("No Ethereum Browser detecked! Check your MetaMask :)")
}
return provider;
}

 const onLoginHandler =  async () =>{
  const provider =detectProvider();
  if(provider){
   if(provider !== window.ethereum){
    console.error("Not window.eth provider. do you intsall wallet?")
   }
   setIsConnecting(true);
    await provider.request({
     method: "eth_requestAccounts"
    });
    setIsConnecting(false);
    props.onLogin(provider);
  }
  

 }
 return (
  <Card className={classes.login}>
      <div  >
      <button onClick={onLoginHandler} className={classes.btn} type="button">
      {!isConnecting && "Connect"}
       
       {isConnecting && "Loading ..."}
        </button>
    </div>
      </Card>

 );
};

export default Login;