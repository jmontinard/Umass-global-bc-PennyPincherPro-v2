const express = require("express");
const router = express.Router();
const passport = require("passport");
const Account = require("../../models/Account");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

// Plaid configuration
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = PlaidEnvironments.sandbox;

// Create Plaid API client configuration
const configuration = new Configuration({
  basePath: PLAID_ENV,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
    },
  },
});

// Create Plaid API client
const plaidClient = new PlaidApi(configuration);

// @route GET api/plaid/link-token/create""
// @desc retrieve a Link token to access plaidLink widget on the client side
// @access Private
router.post(
  "/link-token/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      // Create Link token
      const linkTokenResponse = await plaidClient.linkTokenCreate({
        client_name: "Penny Pincher Pro",
        country_codes: ["US"],
        language: "en",
        user: {
          client_user_id: req.user.id,
        },
        products: ["auth", "transactions"],
      });

      res.json({ link_token: linkTokenResponse.data.link_token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Link token" });
    }
  }
);

// @route GET api/plaid/exchange_public_token"
// @desc Exchange public token from req.body for access token to access plaidApi finacial endpoints
// @access Private
router.post(
  "/exchange_public_token",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    const publicToken = request.body.public_token;

    try {
      const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });

      //   These values should be saved to a persistent database and
      // associated with the currently signed-in user
      const accessToken = plaidResponse.data.access_token;

      response.json({ accessToken });
    } catch (error) {
      console.error("Plaid API Error:", error.response?.data || error.message);
      response.status(500).send("failed");
    }
  }
);

/// @route GET api/plaid/accounts/get
// @desc Get all accounts linked with Plaid for a specific user
// @access Private
router.post(
  "/accounts/get",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Extract the access token from the request body or query parameters
      const accessToken = req.body.access_token;

      // };

      // Now you can use the access token to retrieve the user's accounts
      const accounts = await Account.find({ userId: req.user.id });

      const request = { access_token: accessToken };
      const plaidResponse = await plaidClient.accountsGet(request);

      // Extract only the necessary data from plaidResponse
      const responseData = {
        accounts: plaidResponse.data.accounts,
        item: {
          institution_id: plaidResponse.data.item.institution_id,
          item_id: plaidResponse.data.item.item_id,
          update_type: plaidResponse.data.item.update_type,
          // Include any other necessary properties
        },
        request_id: plaidResponse.data.request_id,
      };
     
      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve accounts" });
    }
  }
);

/// @route GET api/plaid/transactions/sync
// @desc Get all recent Transactions linked from selected accounts via  account ids
// @access Private
router.post(
  "/transactions/sync",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { access_token } = req.body;

    try {
      let transactions = [];

      const plaidResponse = await plaidClient.transactionsSync({
        access_token: access_token,
        count: 100,
      });
      transactions.push({
        transactions: plaidResponse.data.added,
      });

      res.json(transactions);
    } catch (error) {
      console.error("Error synchronizing transactions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
