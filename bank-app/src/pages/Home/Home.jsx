import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import SendMoney from "../../components/SendMoney/SendMoney";
import TrackSpending from "../../components/TrackSpending/TrackSpending";
import Investing from "../../components/Investing/Investing";
import Support from "../../components/Support/Support";
import Settings from "../../components/Settings/Settings";
import styles from "./Home.module.css";

function Home({ user, onLogout }) {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box className={styles.homeContainer}>
      <Navbar
        user={user}
        onLogout={onLogout}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box className={styles.contentWrapper}>
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          className={styles.mainContent}
          sx={{
            marginLeft: { sm: open ? "240px" : "0px" },
            transition: "margin 0.2s",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/send" element={<SendMoney user={user} />} />
            <Route path="/track" element={<TrackSpending user={user} />} />
            <Route path="/investing" element={<Investing user={user} />} />
            <Route path="/support" element={<Support user={user} />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
