import { useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Web3 from 'web3';


function App() {
  const [isConnected,setIsConnected] = useState(false);
  const [currentAccount,setCurrentAccount] =useState(null);
  
  const onLogin =  async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts()
    if(accounts.length === 0){
      console.log('please connect to Metamask')
    }else if(accounts[0] !== currentAccount){
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
    
  }

  const onLogOut = () =>{
    setIsConnected(false);
  }
  return (
    <div >
    <header className="main-header">
          <h5>Connect Wallet with Web3.js</h5>
          <nav className="navbar">
              <a href="/" >
                   {currentAccount}
              </a>
               </nav>
    </header>
    <main>
      {!isConnected && <Login onLogin={onLogin} onLogOut={onLogOut} />}
      {isConnected && <Home currentAccount={currentAccount} />}
     
      
    </main>
    </div>
  );
}

export default App;
