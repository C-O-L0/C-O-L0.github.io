import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./Dashboard.module.css";

function Dashboard({ user }) {
  // Show only recent transactions - last 3
  const recentTransactions = [...user.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const getTransactionIcon = (amount) => {
    return amount > 0 ? (
      <ArrowUpwardIcon className={styles.incomeIcon} />
    ) : (
      <ArrowDownwardIcon className={styles.expenseIcon} />
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user.firstName}!
      </Typography>

      <Grid container spacing={3}>
        {/* Balance Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={styles.card} elevation={2}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.avatarPrimary}>
                <AccountBalanceIcon />
              </Avatar>
              <Typography variant="h6">Your Balance</Typography>
            </Box>
            <Typography variant="h3" className={styles.amount}>
              $
              {user.balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Available Funds
            </Typography>
          </Paper>
        </Grid>

        {/* Investments Summary */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={styles.card} elevation={2}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.avatarSecondary}>
                <TrendingUpIcon />
              </Avatar>
              <Typography variant="h6">Investments</Typography>
            </Box>
            <Typography variant="h3" className={styles.amount}>
              $
              {user.investments
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Investment Value
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={12} lg={4}>
          <Paper className={styles.card} elevation={2}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
              {recentTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={
                          transaction.amount > 0
                            ? styles.incomeAvatar
                            : styles.expenseAvatar
                        }
                      >
                        {getTransactionIcon(transaction.amount)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={transaction.description}
                      secondary={new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    />
                    <Typography
                      variant="body2"
                      className={
                        transaction.amount > 0 ? styles.income : styles.expense
                      }
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Monthly Balance Chart */}
        <Grid item xs={12}>
          <Paper className={styles.chartCard} elevation={2}>
            <Typography variant="h6" gutterBottom>
              Monthly Balance Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={user.monthlySummary}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Balance"]} />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#6a1b9a"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
