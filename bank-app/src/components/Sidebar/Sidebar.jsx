import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Payment as PaymentIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import styles from "./Sidebar.module.css";

function Sidebar({ open, handleDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const drawerWidth = 240;

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/home" },
    { text: "Send/Deposit", icon: <PaymentIcon />, path: "/home/send" },
    { text: "Track Spending", icon: <TimelineIcon />, path: "/home/track" },
    { text: "Investing", icon: <TrendingUpIcon />, path: "/home/investing" },
    { text: "Support", icon: <HelpIcon />, path: "/home/support" },
    { text: "Settings", icon: <SettingsIcon />, path: "/home/settings" },
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Box className={styles.toolbar} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            className={path === item.path ? styles.active : ""}
          >
            <ListItemIcon
              className={path === item.path ? styles.activeIcon : ""}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default Sidebar;
