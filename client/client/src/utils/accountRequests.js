import axios from "axios";

const baseUrl = "http://localhost:5001"; 

// geting link token from plaidApi
export const getLinkToken = async ()  => {
    try {
      const res = await axios.post(`${baseUrl}/api/plaid/link-token/create`);
      return res.data.link_token;
    } catch (err) {
      console.log(err);
    }
  };
// exchange public token which user gets after onSuccess callback from plaidLink widget completes for access token on the backend which allows up to fully use the plaidApi 
  export const exchangePublicToken = async (publicToken) => {
    try {
      const res = await axios.post(`${baseUrl}/api/plaid/exchange_public_token`, { public_token: publicToken });
  
      const accessToken = res.data.accessToken;
      localStorage.setItem('accessToken', accessToken)
      return accessToken;
    } catch (error) {
      console.error('Error exchanging public token:', error);
      throw error;
    }
  };


  
  

  // Get all accounts for a specific user
  export const getAccounts = async () => {

    try {
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem('accessToken');
  
      // Check if access token is available
      if (!accessToken) {
        throw new Error('Access token not found in local storage');
      }
  
      // Make a POST request to backend with access token in the request body
      const res = await axios.post(`${baseUrl}/api/plaid/accounts/get`, {
        access_token: accessToken,
      });
       
      return res.data
    
    } catch (err) {
      console.error('Error getting accounts:', err);
    }
  };
  

// Get out transsactions data from the backend  by hitting the end point and getting sending access token in the req.body
export const transactionsSync = async (accessToken) => {
  
    try {
      const res = await axios.post(`${baseUrl}/api/plaid/transactions/sync`, {
        access_token: accessToken,
        cursor: ''
      });
      return res.data
    } catch (err) {
      console.error('Error fetching transactions:', err);
      throw err;
    }
  }; 