import React, { useState } from "react";
import s from "./app.module.scss";

import Box from "@mui/material/Box";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import WorkSpace from "./components/WorkSpace";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currnetTab, setCurrentTab] = useState(0)

  const onTabClick = (index: number) => {
    setCurrentTab(index)
  }

  const onBurgerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        onBurgerClick={onBurgerClick}
      />
      <SideBar open={open} onTabClick={onTabClick}/>
      <WorkSpace open={open} />
    </Box>
  );
};

export default App;
