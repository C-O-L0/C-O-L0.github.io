import React from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  Avatar,
  CardContent,
  Card,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./Investing.module.css";

function Investing({ user }) {
  // Market data - mock stock market trends
  const marketTrends = [
    { name: "Tech Sector", change: "+2.3%", status: "up" },
    { name: "Financial Services", change: "-0.7%", status: "down" },
    { name: "Healthcare", change: "+1.5%", status: "up" },
    { name: "Energy", change: "-0.3%", status: "down" },
    { name: "Consumer Goods", change: "+0.8%", status: "up" },
  ];

  // Prepare data for portfolio breakdown
  const portfolioData = user.investments.map((inv) => ({
    name: inv.name,
    value: inv.amount,
  }));

  // Colors for pie chart
  const COLORS = ["#6a1b9a", "#1565c0", "#aa00ff", "#0091ea", "#4a148c"];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Investment Portfolio
      </Typography>

      <Grid container spacing={3}>
        {/* Portfolio Summary */}
        <Grid item xs={12} md={8}>
          <Paper className={styles.summaryPaper}>
            <Box className={styles.summaryHeader}>
              <Typography variant="h6">Portfolio Overview</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Investment
              </Button>
            </Box>

            <Typography variant="h4" gutterBottom>
              $
              {user.investments
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </Typography>

            <Box sx={{ height: 300, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Amount",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Market Trends */}
        <Grid item xs={12} md={4}>
          <Paper className={styles.trendsPaper}>
            <Typography variant="h6" gutterBottom>
              Market Trends
            </Typography>
            <List>
              {marketTrends.map((trend, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={trend.name} />
                    <Box
                      className={
                        trend.status === "up"
                          ? styles.trendUp
                          : styles.trendDown
                      }
                    >
                      {trend.status === "up" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                      {trend.change}
                    </Box>
                  </ListItem>
                  {index < marketTrends.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Investment Cards */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Your Investments
          </Typography>
          <Grid container spacing={3}>
            {user.investments.map((investment) => (
              <Grid item xs={12} md={4} key={investment.id}>
                <Card>
                  <CardContent>
                    <Box className={styles.investmentHeader}>
                      <Avatar className={styles.investmentAvatar}>
                        <TrendingUpIcon />
                      </Avatar>
                      <Typography variant="h6">{investment.name}</Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      className={styles.investmentAmount}
                    >
                      ${investment.amount.toLocaleString()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={
                            investment.growth > 0
                              ? Math.min(investment.growth * 5, 100)
                              : 0
                          }
                          className={
                            investment.growth > 0
                              ? styles.positiveProgress
                              : styles.negativeProgress
                          }
                        />
                      </Box>
                      <Box
                        className={
                          investment.growth > 0
                            ? styles.positiveGrowth
                            : styles.negativeGrowth
                        }
                      >
                        {investment.growth > 0 ? "+" : ""}
                        {investment.growth}%
                      </Box>
                    </Box>
                    <Button variant="outlined" fullWidth>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Investing;
