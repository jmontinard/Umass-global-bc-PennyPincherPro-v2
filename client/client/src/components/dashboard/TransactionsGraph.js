import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";



const TransactionsGraph = ({ transactions }) => {
  // Ensure transactionsData is an array before proceeding
  if (!Array.isArray(transactions)) {
    // You can return null, a loading spinner, or some placeholder content here
    return null; // or <Spinner /> if you have a loading component
  }
  

  // Group transactions by category and calculate total amounts
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const mainCategory = transaction.category[0]; // Assuming the main category is the first in the array

    // Group similar categories together
    let groupName = mainCategory;
    if (
      mainCategory.includes("Food") ||
      mainCategory.includes("Drink") ||
      mainCategory.includes("Restaurant")
    ) {
      groupName = "Food & Dining";
    } else if (mainCategory.includes("Travel") || mainCategory === "Taxi") {
      groupName = "Travel";
    } else if (
      mainCategory.includes("Payment") ||
      mainCategory.includes("Credit Card")
    ) {
      groupName = "Payments";
    }

    // Sum the amounts for each group
    if (!acc[groupName]) {
      acc[groupName] = { name: groupName, value: 0 };
    }
    acc[groupName].value += Math.abs(transaction.amount); // Use absolute value for expenditures

    return acc;
  }, {});

  // Convert the object into an array for Recharts
  const data = Object.values(categoryTotals);

  // Define colors for each slice
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <Typography
        variant="h5"
        style={{
          borderBottom: "1px solid #7f7f7f",
          width: "fit-content",
          display: "inline-block",
          color: "#039BE5",
        }}
      >
        Transactions Analysis
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount Spent']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default TransactionsGraph;
