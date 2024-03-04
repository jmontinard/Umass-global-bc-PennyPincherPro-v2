import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const Accounts = ({ accounts }) => {
  return (
    <>
      <Typography variant="h5" style={{ 
        borderBottom: "1px solid #7f7f7f", 
        width: "fit-content",
        display: "inline-block",
        color:"#039BE5",
        marginBottom: "20px"
      }}>
        Linked Accounts
      </Typography>
      <List>
        {accounts.map((account) => (
          <ListItem key={account.account_id} disablePadding>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6">{account.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {account.official_name}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography variant="h6" color='#039BE5'>
                    {`$${account.balances.available} ${account.balances.iso_currency_code}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {account.subtype}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Accounts;
