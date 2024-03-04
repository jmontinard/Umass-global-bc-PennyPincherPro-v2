import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import p3Logo from "../../assets/images/p3Logo.png";

const TransactionsTable = ({ transactions }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography
        variant="h5"
        style={{
          borderBottom: "1px solid #7f7f7f",
          width: "fit-content",
          display: "inline-block",
          color: "#039BE5",
          marginBottom: "20px",
        }}
      >
        Recent Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#0047ab" }}>Date</TableCell>
              <TableCell style={{ color: "#0047ab" }}>Name</TableCell>
              <TableCell align="right" style={{ color: "#0047ab" }}>
                Amount
              </TableCell>
              <TableCell align="right" style={{ color: "#0047ab" }}>
                Category
              </TableCell>
              <TableCell align="right" style={{ color: "#0047ab" }}>
                Merchant
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.transaction_id}
                style={{ verticalAlign: "middle" }}
              >
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {transaction.logo_url ? (
                      <Avatar
                        alt={transaction.name}
                        src={transaction.logo_url}
                      />
                    ) : (
                      <Avatar alt={transaction.name} src={p3Logo} />
                    )}
                  </div>
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: transaction.amount < 0 ? "red" : "green" }}
                >
                  {transaction.amount < 0
                    ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                    : `$${transaction.amount.toFixed(2)}`}
                </TableCell>
                <TableCell align="right">
                  {transaction.category
                    ? transaction.category.join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell align="right">
                  {transaction.merchant_name || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionsTable;
