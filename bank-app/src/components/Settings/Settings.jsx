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
  Switch,
  Divider,
  Avatar,
  Alert,
} from "@mui/material";
import {
  Person as PersonIcon,
  VpnKey as VpnKeyIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import styles from "./Settings.module.css";

function Settings({ user }) {
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: "555-123-4567", // mock data
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would update the user profile here
    setNotification({
      type: "success",
      message: "Profile updated successfully!",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setNotification({
        type: "error",
        message: "Password must be at least 6 characters long!",
      });
      return;
    }

    // In a real app, we would update the password here
    setNotification({
      type: "success",
      message: "Password updated successfully!",
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {notification && (
        <Alert severity={notification.type} sx={{ mb: 3 }}>
          {notification.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.settingsCard}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.headerIcon}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6">Personal Information</Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <form onSubmit={handleProfileSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.settingsCard}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.headerIcon}>
                <VpnKeyIcon />
              </Avatar>
              <Typography variant="h6">Security Settings</Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <form onSubmit={handlePasswordSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <Box
                          component="span"
                          onClick={handleTogglePassword}
                          sx={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </Box>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.settingsCard}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.headerIcon}>
                <NotificationsIcon />
              </Avatar>
              <Typography variant="h6">Notification Settings</Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 1 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive important updates via email"
                />
                <Switch
                  edge="end"
                  checked={notificationSettings.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Push Notifications"
                  secondary="Receive alerts on your device"
                />
                <Switch
                  edge="end"
                  checked={notificationSettings.pushNotifications}
                  onChange={() => handleNotificationChange("pushNotifications")}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SMS Notifications"
                  secondary="Receive text messages for important alerts"
                />
                <Switch
                  edge="end"
                  checked={notificationSettings.smsNotifications}
                  onChange={() => handleNotificationChange("smsNotifications")}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Marketing Emails"
                  secondary="Receive promotions and offers"
                />
                <Switch
                  edge="end"
                  checked={notificationSettings.marketingEmails}
                  onChange={() => handleNotificationChange("marketingEmails")}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Account Information */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.settingsCard}>
            <Box className={styles.cardHeader}>
              <Avatar className={styles.headerIcon}>
                <CreditCardIcon />
              </Avatar>
              <Typography variant="h6">Account Information</Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <List>
              <ListItem>
                <ListItemText
                  primary="Account Number"
                  secondary={user.accountNumber || "1234567890"}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Account Type"
                  secondary="Checking Account"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Branch"
                  secondary="Main Branch - New York"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Account Opening Date"
                  secondary="January 15, 2022"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
