import React, { useState } from "react";
import s from "./app.module.scss";
import { NoteContextProvider } from "./context/NoteContext";

import Box from "@mui/material/Box";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import WorkSpace from "./components/WorkSpace";
import NoteCreator from "./components/NoteCreator";
import ListNotes from "./components/ListNotes";
import ListNotesGarbage from "./components/ListNotesGarbage";

import { ITabName } from "./types/common";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<ITabName>("Заметки");

  const onTabClick = (title: ITabName) => {
    setCurrentTab(title);
  };

  const onBurgerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <NoteContextProvider>
      <Box sx={{ display: "flex" }}>
        <Header onBurgerClick={onBurgerClick} />
        <SideBar open={open} currentTab={currentTab} onTabClick={onTabClick} />
        {currentTab === "Заметки" && (
          <WorkSpace open={open}>
            <NoteCreator />
            <ListNotes />
          </WorkSpace>
        )}
        {currentTab === "Корзина" && (
          <WorkSpace open={open}>
            <div className={s.notification}>
              <p>Закладки помещенные в корзину, будут удалены через 7 дней</p>
            </div>
            <ListNotesGarbage />
          </WorkSpace>
        )}
      </Box>
    </NoteContextProvider>
  );
};

export default App;
