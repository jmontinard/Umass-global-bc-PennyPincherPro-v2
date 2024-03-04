import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../utils/AuthContext"; 

import Accounts from "./Accounts";
import Transactions from "./Transactions";
import Spinner from "./Spinner";
import TransactionsGraph from "./TransactionsGraph";
import BudgetTool from "./BudgetTool"; 
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";

import {exchangePublicToken, transactionsSync, getAccounts, getLinkToken} from "../../utils/accountRequests";

const Dashboard = (props) => {
  const [linkToken, setLinkToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { user,logoutUser } = useAuth(); 
  const [linkComplete, setLinkComplete] = useState(false);
  const [total, setTotal] = useState()

  const navigate = useNavigate();


  // this was giving me issue persisting the data goign to work on this for the future update
  // useEffect(() => {
  //      // Check if there is data in localStorage when the component mounts
  //      const storedAccounts = localStorage.getItem("accounts");
  //      const storedTransactions = localStorage.getItem("transactions");
  //      if (storedAccounts && storedTransactions) {
  //        setLinkComplete(true)
  //        setAccounts(JSON.parse(storedAccounts));
  //        setTransactions(JSON.parse(storedTransactions));
  //        const totalBalance = JSON.parse(storedAccounts).accounts.reduce((total, account) => {
  //          return total + account.balances.available;
  //        }, 0);
  //        setTotal(totalBalance);
  //       }
    
  //  console.log( "link is ",linkComplete)
  // }, [linkComplete])
  

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
      
        const linkToken = await getLinkToken();
        // localStorage.setItem("linkToken", linkToken);
        setLinkToken(linkToken); 
      } catch (error) {
        console.error("Error getting Link Token:", error);
      }
    };

    fetchLinkToken();
  },[]);
 
  useEffect(() => {
        // Function to fetch Plaid data
        const fetchPlaidData = async () => {
          try {
            setDataLoading(true);
            // Retrieve accessToken from localStorage
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
              // Handle case when accessToken is not available
              console.error("Access token not found in localStorage");
              return;
            }
             // Fetch account and transaction data using accessToken
            const accountData = await getAccounts(accessToken);
            const transData = await transactionsSync(accessToken);
            const totalBalance = accountData.accounts.reduce((total, account) => {
              return total + account.balances.available;
            }, 0);
             // Update state with fetched data
            setAccounts(accountData);
            setTransactions(transData[0].transactions);
            setTotal(totalBalance);
             // Save data to localStorage
            localStorage.setItem("accounts", JSON.stringify(accountData));
            localStorage.setItem("transactions", JSON.stringify(transData[0].transactions));
          } catch (error) {
            console.error("Error fetching transactions:", error);
          } finally {
            setDataLoading(false);
          }
        };
     
          // Fetch Plaid data if not available in localStorage
          fetchPlaidData();
      }, []); 
    

    
   
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser(navigate);

    // Clear localStorage data when the user logs out
    localStorage.removeItem("plaidMetadata");
    localStorage.removeItem("accounts");
    localStorage.removeItem("transactions");

  };

      
  // const lToken = localStorage.getItem("linkToken");

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      const plaidData = {
        public_token: public_token,
        metadata: metadata,
      };
      localStorage.setItem("plaidMetadata", JSON.stringify(metadata));
      exchangePublicToken(plaidData.public_token);
      setLinkComplete(true); 
    },
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        <b>Welcome, </b> 
        <span style={{color:'#039BE5'}}>
        {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1)}
        </span>
      </Typography>
      <Typography variant="body1" paragraph>
        To get started, link your first bank account below
      </Typography>
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="main-btn"
          onClick={() => open()}
          style={{ marginRight: "10px" }}
        
        >
          Link Account
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="main-btn"
          onClick={onLogoutClick}
        >
          Logout
        </Button>
      </div>

      {linkComplete ? (
        <>
          {dataLoading ? ( // Render Spinner if data is loading
            <Spinner />
          ) : (
            <>
             {accounts && accounts.accounts && (
               <>
                <Accounts accounts={accounts.accounts} />
                <BudgetTool totalAccountBalance={total} recentTransactions={transactions} />
                </>
              )}
              {/* change this to be a check to see if accounts and transactions our true for budgets  */}
              {transactions && transactions.length > 0 ? (
                <>
                  <Transactions transactions={transactions} />
                  <TransactionsGraph transactions={transactions} />
                </>
              ) : (
                <Typography variant="body1" paragraph>
                  No transactions available.
                </Typography>
              )}
             
            </>
          )}
        </>
      ) : null}
    </Container>
  );
};
export default Dashboard;
