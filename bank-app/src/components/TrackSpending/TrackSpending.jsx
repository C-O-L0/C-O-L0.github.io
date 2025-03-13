import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import styles from "./TrackSpending.module.css";

function TrackSpending({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get unique categories for filter dropdown
  const categories = [
    "All",
    ...new Set(user.transactions.map((t) => t.category)),
  ];

  // Filter transactions based on search term and category
  const filteredTransactions = user.transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "All" ||
      transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Prepare data for monthly spending chart
  const spendingByMonth = user.monthlySummary.map((month, index) => {
    // Calculate the spending for each month
    // For simplicity, we're using a simulated approach here
    const startingBalance =
      index === 0 ? 3000 : user.monthlySummary[index - 1].balance;
    const spending = startingBalance - month.balance + (index === 0 ? 0 : 1500); // Assuming a monthly income of $1500

    return {
      ...month,
      spending: spending > 0 ? spending : 0,
    };
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Track Your Spending
      </Typography>

      {/* Spending Chart */}
      <Paper className={styles.chartPaper}>
        <Typography variant="h6" gutterBottom>
          Monthly Spending Overview
        </Typography>
        <Box sx={{ height: 300, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={spendingByMonth}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <ReferenceLine
                y={1500}
                label="Budget Target"
                stroke="#ff9800"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="spending"
                name="Spending"
                stroke="#e91e63"
                fill="rgba(233, 30, 99, 0.1)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance Left"
                stroke="#6a1b9a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Search and Filter */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <Paper>
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.category}
                      size="small"
                      className={
                        transaction.category === "Income"
                          ? styles.incomeChip
                          : styles.categoryChip
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      transaction.amount > 0 ? styles.income : styles.expense
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default TrackSpending;
