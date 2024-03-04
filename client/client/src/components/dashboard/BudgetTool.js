import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";

const BudgetTool = ({ totalAccountBalance, recentTransactions }) => {
  const [budgetAmount, setBudgetAmount] = useState(""); // State for budget amount
  const [budgetPlan, setBudgetPlan] = useState(null); // State for budget plan
  const [totalSpent, setTotalSpent] = useState(""); // State for total spent
  const [defaultBudget, setDefaultBudget] = useState(1000); // Default budget value

  // Effect to set the default budget when the component mounts
  useEffect(() => {
    setBudgetAmount(defaultBudget.toString());
  }, [defaultBudget]);

  // Function to handle budget calculation
  const handleBudgetCalculation = () => {
    if (!recentTransactions || recentTransactions.length === 0) {
      // Handle the case where recentTransactions is undefined or empty
      return;
    }

    // Convert budgetAmount to a number
    const budget = parseFloat(budgetAmount);

    // Calculate total spending from recent transactions
    let totalSpending = recentTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    setTotalSpent(parseFloat(totalSpending.toFixed(2)));
    // Calculate remaining balance after deducting total spending from total account balance
    const remainingBalance = totalAccountBalance - totalSpending;

    // Calculate the difference between remaining balance and budget
    let difference = remainingBalance - budget;
    difference = parseFloat(difference.toFixed(2));
    // Determine the budget plan based on the difference
    let budgetPlan;
    if (difference > 0) {
      budgetPlan = `You have exceeded your budget by $${Math.abs(difference)}.`;
    } else if (difference < 0) {
      budgetPlan = `You are under your budget by $${Math.abs(difference)}.`;
    } else {
      budgetPlan = "You have reached your budget goal exactly.";
    }

    // Update state with the calculated budget plan
    setBudgetPlan(budgetPlan);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography
        variant="h5"
        style={{
          borderBottom: "1px solid #7f7f7f",
          width: "fit-content",
          display: "inline-block",
          color: "#039BE5",
        }}
        gutterBottom
      >
        Budget Tool
      </Typography>
      <Typography sx={{ color: "#039BE5" }} variant="body1" paragraph>
        This budget tool calculates the total amount of account balances and subtracts that from the total of your recent spending.
      </Typography>
      <Typography variant="body1" paragraph>
        Enter your desired budget or savings goal below:
      </Typography>
      <TextField
        label="Budget Amount"
        variant="outlined"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleBudgetCalculation}
      >
        Calculate Budget Plan
      </Button>
      {/* Display budget plan if available */}
      {budgetPlan && (
        <div style={{ margin: "20px 0" }}>
          <Typography variant="body1" paragraph color="green">
            Total balance: ${totalAccountBalance}
          </Typography>
          <Typography variant="body1" paragraph color="red">
            Total spent: {totalSpent < 0 ? "-" : ""}${Math.abs(totalSpent).toFixed(2)}
          </Typography>

          <Typography variant="body1" paragraph>
            {budgetPlan}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default BudgetTool;
