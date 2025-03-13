import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  ArrowUpward as ArrowUpwardIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import styles from "./SendMoney.module.css";

function SendMoney({ user }) {
  const [tabValue, setTabValue] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setAmount("");
    setRecipient("");
    setDescription("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Form validation
    if (tabValue === 0 && !recipient) {
      setError("Please enter a recipient");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > user.balance && tabValue === 0) {
      setError("Insufficient funds");
      return;
    }

    // In a real app, we would make an API call to process the transaction
    const successMessage =
      tabValue === 0
        ? `Successfully sent $${amount} to ${recipient}`
        : `Successfully deposited $${amount} to your account`;

    setSuccess(successMessage);

    // Clear form fields
    setAmount("");
    setRecipient("");
    setDescription("");
  };

  // Mock recent contacts
  const recentContacts = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com" },
    { id: 2, name: "Michael Brown", email: "michael.b@example.com" },
    { id: 3, name: "Emma Wilson", email: "emma.w@example.com" },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {tabValue === 0 ? "Send Money" : "Deposit Money"}
      </Typography>

      <Paper sx={{ width: "100%", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<SendIcon />} label="SEND MONEY" />
          <Tab icon={<ArrowUpwardIcon />} label="DEPOSIT" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={styles.formPaper}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              {tabValue === 0 && (
                <TextField
                  fullWidth
                  label="Recipient"
                  variant="outlined"
                  margin="normal"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Email or username"
                />
              )}
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                margin="normal"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  startAdornment: <AttachMoneyIcon color="action" />,
                }}
              />
              <TextField
                fullWidth
                label="Description (Optional)"
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this for?"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className={styles.submitBtn}
                startIcon={tabValue === 0 ? <SendIcon /> : <ArrowUpwardIcon />}
              >
                {tabValue === 0 ? "Send Money" : "Deposit"}
              </Button>
            </form>
          </Paper>
        </Grid>

        {tabValue === 0 && (
          <Grid item xs={12} md={6}>
            <Paper className={styles.contactsPaper}>
              <Typography variant="h6" gutterBottom>
                Recent Contacts
              </Typography>
              <List>
                {recentContacts.map((contact) => (
                  <ListItem
                    button
                    key={contact.id}
                    onClick={() => setRecipient(contact.email)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.email}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SendMoney;
