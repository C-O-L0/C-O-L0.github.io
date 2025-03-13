import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Chat as ChatIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LiveHelp as LiveHelpIcon,
} from "@mui/icons-material";
import styles from "./Support.module.css";

function Support() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would process the form submission here
    alert("Support request submitted! Our team will contact you shortly.");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // FAQ items
  const faqItems = [
    {
      question: "How do I reset my password?",
      answer:
        'To reset your password, click on the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address to create a new password.',
    },
    {
      question: "How do I transfer money to another bank?",
      answer:
        "To transfer money to another bank, go to the Send Money tab, enter the recipient's bank details including the account number and routing number, specify the amount, and confirm the transfer.",
    },
    {
      question: "Are my transactions secure?",
      answer:
        "Yes, all transactions are secured with bank-level encryption. We use multi-factor authentication and real-time fraud monitoring to ensure your financial data stays protected.",
    },
    {
      question: "How long do transfers take to process?",
      answer:
        "Internal transfers between accounts within our bank typically process immediately. Transfers to other banks usually take 1-3 business days depending on the receiving bank and the time of the transaction.",
    },
    {
      question: "How do I report suspicious activity?",
      answer:
        "If you notice unauthorized transactions or suspicious activity on your account, please contact our customer support immediately at 1-800-123-4567 or through the secure messaging feature in your account.",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Support
      </Typography>

      <Grid container spacing={3}>
        {/* FAQ Section */}
        <Grid item xs={12}>
          <Paper className={styles.faqPaper}>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Box>
              {faqItems.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography className={styles.faqQuestion}>
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} md={7}>
          <Paper className={styles.contactPaper}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={contactForm.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Your Email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={contactForm.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={contactForm.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 1 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Paper className={styles.infoPaper}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar className={styles.contactIcon}>
                    <ChatIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="Live Chat" secondary="Available 24/7" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Avatar className={styles.contactIcon}>
                    <EmailIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Email Support"
                  secondary="support@bankapp.com"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Avatar className={styles.contactIcon}>
                    <PhoneIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Phone Support"
                  secondary="1-800-123-4567"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Avatar className={styles.contactIcon}>
                    <LiveHelpIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Help Center"
                  secondary="Visit our online help center"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Support;
