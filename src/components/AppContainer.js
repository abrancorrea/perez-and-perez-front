import React, { useState } from "react";
import AppDrawer from "./Drawer";
import Header from "./Header";

const AppContainer = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <Header onOpenDrawer={() => setIsOpenDrawer(true)} />
      <AppDrawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} />
      {children}
    </>
  );
};

export default AppContainer;
